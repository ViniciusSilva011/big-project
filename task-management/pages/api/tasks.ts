import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import {authOptions} from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

const prisma = new PrismaClient({});

const session = await getServerSession(req, res, authOptions)
if(session)
  console.log('session.user.roles[0].permissions :>> ', session.user.roles[0]);
if (req.method === 'GET'){
    const tasks = await prisma.task.findMany();
    return res.json({tasks})
  } else if (req.method === 'POST') {
    // if (!req.body.name || !req.body.description)
    //   return res.status(400);

    const task = await prisma.task.create({
      data:{
        name: 'conf ' + crypto.randomUUID(),
        description: 'desc ' + crypto.randomUUID(),
        user_id: 'clixgih8o0000vqpeo50k38i3'
      }
    });
    return res.status(201).json({task});
  }

  return res.status(404);
}   