import { projects } from '@prisma/client';
import { prisma } from '@/config';

async function getProjects(userId: number): Promise<projects[]> {
  return prisma.$queryRaw`
    SELECT
      p.*
    FROM
      projects p
    LEFT JOIN
      expertise e ON e.id = p.expertise_id
    LEFT JOIN
      user_expertise ue ON ue.expertise_id = e.id AND ue.user_id = ${userId}
    ORDER BY
      CASE WHEN ue.user_id IS NOT NULL THEN 0 ELSE 1 END,
      p.id;
  `;
}

const projectRepository = {
  getProjects,
};

export default projectRepository;
