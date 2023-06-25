import expertiseRepository from '@/repositories/expertise-repository';
import projectRepository from '@/repositories/projects-repository';
import universityRepository from '@/repositories/university-repository';
import userRepository from '@/repositories/user-repository';

export async function getProjects(userId: number) {
  const projects = await projectRepository.getProjects(userId);
  const result = [];
  for (let i = 0; i < projects.length; i++) {
    const professor = await userRepository.findById(projects[i].professor_id);
    const university = await universityRepository.findUniversityById(projects[i].university_id);
    const expertise = await expertiseRepository.findExpertiseById(projects[i].expertise_id);
    result.push({
      id: projects[i].id,
      professor: professor.name,
      university: university.name,
      expertise: expertise.name,
      name: projects[i].name,
      description: projects[i].description,
    });
  }
  return result;
}

const projectService = {
  getProjects,
};

export default projectService;
