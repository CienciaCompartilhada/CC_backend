import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createProject, createTeacher, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { createUniversity } from '../factories/university-factory';
import { createExpertise } from '../factories/expertise-factory';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe('GET /projects', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/projects');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/projects').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const user = await createUser();
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    const response = await server.get('/projects').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 and list of projects', async () => {
      const user = await createUser();
      const university = await createUniversity();
      const teacher = await createTeacher();
      const expertise = await createExpertise();
      const project1 = await createProject(teacher, university, expertise);
      const project2 = await createProject(teacher, university, expertise);
      const token = await generateValidToken(user);

      const response = await server.get('/projects').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: project2.id,
          professor: teacher.name,
          university: university.name,
          expertise: expertise.name,
          name: project2.name,
          description: project2.description,
        },
        {
          id: project1.id,
          professor: teacher.name,
          university: university.name,
          expertise: expertise.name,
          name: project1.name,
          description: project1.description,
        },
      ]);
    });
  });
});
