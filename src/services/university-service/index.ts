import universityRepository from '@/repositories/university-repository';

export async function getAllUniversities() {
  const universities: any = await universityRepository.findAllUniversities();
  const result = [];
  for (let i = 0; i < universities.length; i++) {
    result.push({
      id: universities[i].id,
      name: universities[i].name,
    });
  }
  return result;
}

const projectService = {
  getAllUniversities,
};

export default projectService;
