import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

const prisma = new PrismaClient({});
  if (req.method === 'GET'){
    const tasks = await prisma.task.findMany();
    return res.json(tasks)
  } else if (req.method === 'POST') {
    const task = await prisma.task.create({
      data:{
        name: 'conf ' + crypto.randomUUID(),
        description: 'desc ' + crypto.randomUUID(),
        user_id: 'clixgih8o0000vqpeo50k38i3'
      }
    });
    return res.status(201).json(task);
  }

  return res.status(404);
}   