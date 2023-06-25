import { session } from '@prisma/client';
import { prisma } from '@/config';

export async function createSession(userId: number, token: string): Promise<session> {
  return prisma.session.create({
    data: {
      token: token,
      user_id: userId,
    },
  });
}
