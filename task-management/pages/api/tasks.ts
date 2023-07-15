import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const prisma = new PrismaClient({});

  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).send('Unauthorized.');
  if (req.method === 'GET') {
    let tasks = await prisma.task.findMany({
      include: {
        users: {
          include: {
            user: true
          }
        },
        createdBy: true
      }
    });

    const fTasks = tasks.map(task => {

      return ({
        id: task.id,
        name: task.name,
        description: task.description,
        assignees: task.users.map(e => ({ id: e.user_id, name: e.user.name, avatar: e.user.image })),
        reporter: { id: task.createdBy.id, name: task.createdBy.name, avatar: task.createdBy.image },
        created_at: task.created_at,
        updated_at: task.updated_at
      })
    })
    return res.json({ tasks: fTasks })
  } else if (req.method === 'POST') {
    if (!req.body.name || !req.body.description)
      return res.status(400).send('name or description is missing');

    const task = await prisma.task.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        user_id: session.user.id
      }
    });
    return res.status(201).json({ task });
  }

  return res.status(404).send('Unauthorized.b');
}   