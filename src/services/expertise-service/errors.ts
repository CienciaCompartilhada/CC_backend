import { ApplicationError } from '@/protocols';

export function inexistentExpertiseError(): ApplicationError {
  return {
    name: 'InexistentExpertiseError',
    message: 'expertise does not exist',
  };
}
