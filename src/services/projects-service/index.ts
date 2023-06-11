import projectRepository from '@/repositories/projects-repository';

export async function getProjects() {
  const projects = await projectRepository.getProjects();
  return projects;
}

const projectService = {
  getProjects,
};

export default projectService;
