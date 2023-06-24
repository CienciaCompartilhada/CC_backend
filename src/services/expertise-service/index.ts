import expertiseRepository from '@/repositories/expertise-repository';
import { inexistentExpertiseError } from './errors';
import userRepository from '@/repositories/user-repository';
import httpStatus from 'http-status';

export async function updateExpertise(userId: number, expertises: string[]) {
  for (let i = 0; i < expertises.length; i++) {
    if (expertises[i] !== '') {
      const expertiseExists = await expertiseRepository.findExpertiseById(parseInt(expertises[i]));
      if (!expertiseExists) throw inexistentExpertiseError();
    }
  }
  await expertiseRepository.removeUserExpertises(userId);
  for (let i = 0; i < expertises.length; i++) {
    if (expertises[i] !== '') {
      await userRepository.setUserExpertise(userId, parseInt(expertises[i]));
    }
  }
  return expertises;
}

export async function getAllExpertises() {
  const expertises = expertiseRepository.findAllExpertises();
  return expertises;
}

const expertiseService = {
  updateExpertise,
  getAllExpertises,
};

export default expertiseService;
