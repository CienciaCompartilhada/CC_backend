import { faker } from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import supertest from 'supertest';
import { connectUserExpertise, connectUserUniversity, createStudent, createTeacher, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { createUniversity } from '../factories/university-factory';
import { createExpertise } from '../factories/expertise-factory';
import { duplicatedEmailError } from '@/services/users-service';
import { prisma } from '@/config';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('POST /users', () => {
  it('should respond with status 400 when body is not given', async () => {
    const response = await server.post('/users');

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('should respond with status 400 when body is not valid', async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post('/users').send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe('when body is valid', () => {
    const generateValidBody = () => ({
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password(6),
      is_teacher: false,
    });

    it('should respond with status 409 when there is an user with given email', async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await server.post('/users').send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual(duplicatedEmailError());
    });

    it('should respond with status 201 and create user when given email is unique', async () => {
      const body = generateValidBody();

      const response = await server.post('/users').send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: body.email,
      });
    });

    it('should not return user password on body', async () => {
      const body = generateValidBody();

      const response = await server.post('/users').send(body);

      expect(response.body).not.toHaveProperty('password');
    });

    it('should save user on db', async () => {
      const body = generateValidBody();

      const response = await server.post('/users').send(body);

      const user = await prisma.users.findUnique({
        where: { email: body.email },
      });
      expect(user).toEqual(
        expect.objectContaining({
          id: response.body.id,
          email: body.email,
        }),
      );
    });
  });
});

describe('GET /users/teachers', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/users/teachers');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/users/teachers').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const user = await createUser();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    const response = await server.get('/users/teachers').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 200 and list of teachers ordered by match algorythm', async () => {
      await prisma.users.deleteMany({});

      const user = await createUser();

      const university = await createUniversity();

      const expertise1 = await createExpertise();
      const expertise2 = await createExpertise();

      const teacher1 = await createTeacher();
      const teacher2 = await createTeacher();
      const teacher3 = await createTeacher();

      await connectUserUniversity(user, university);
      await connectUserUniversity(teacher1, university);
      await connectUserUniversity(teacher2, university);
      await connectUserUniversity(teacher3, university);

      await connectUserExpertise(user, expertise1);
      await connectUserExpertise(user, expertise2);
      await connectUserExpertise(teacher1, expertise1);
      await connectUserExpertise(teacher1, expertise2);
      await connectUserExpertise(teacher3, expertise1);

      const token = await generateValidToken(user);
      const response = await server.get('/users/teachers').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          name: teacher1.name,
          university: university.name,
          expertises: [
            {
              id: expertise1.id,
              name: expertise1.name,
            },
            {
              id: expertise2.id,
              name: expertise2.name,
            },
          ],
        },
        {
          name: teacher3.name,
          university: university.name,
          expertises: [
            {
              id: expertise1.id,
              name: expertise1.name,
            },
          ],
        },
        {
          name: teacher2.name,
          university: university.name,
          expertises: [],
        },
      ]);
    });
  });
});

describe('GET /users/students', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/users/students');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/users/students').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const user = await createUser();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    const response = await server.get('/users/students').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe('when token is valid', () => {
    it('should respond with status 200 and list of teachers ordered by match algorythm', async () => {
      await cleanDb();

      const user = await createUser();

      const university = await createUniversity();

      const expertise1 = await createExpertise();
      const expertise2 = await createExpertise();

      const student1 = await createStudent();
      const student2 = await createStudent();
      const student3 = await createStudent();

      await connectUserUniversity(user, university);
      await connectUserUniversity(student1, university);
      await connectUserUniversity(student2, university);
      await connectUserUniversity(student3, university);

      await connectUserExpertise(user, expertise1);
      await connectUserExpertise(user, expertise2);
      await connectUserExpertise(student1, expertise1);
      await connectUserExpertise(student1, expertise2);
      await connectUserExpertise(student3, expertise1);

      const token = await generateValidToken(user);
      const response = await server.get('/users/students').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          name: student1.name,
          university: university.name,
          expertises: [
            {
              id: expertise1.id,
              name: expertise1.name,
            },
            {
              id: expertise2.id,
              name: expertise2.name,
            },
          ],
        },
        {
          name: student3.name,
          university: university.name,
          expertises: [
            {
              id: expertise1.id,
              name: expertise1.name,
            },
          ],
        },
        {
          name: student2.name,
          university: university.name,
          expertises: [],
        },
      ]);
    });
  });
});
