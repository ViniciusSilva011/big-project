import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next"

const prisma = new PrismaClient({});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (!req.query.taskId) return res.status(404).send('Not Found');
    if (req.method === 'GET') {
        const task = await prisma.task.findFirst({
            where: {
                id: parseInt(req.query.taskId as string)
            }
        });
        return res.json({ task });
    } else if (req.method === 'DELETE') {
        const task = await prisma.task.delete({
            where: {
                id: parseInt(req.query.taskId as string)
            }
        });
        return res.json({ task });
    } else if (req.method === 'PUT') {
        if (!req.body.name || !req.body.description)
            return res.status(400).send('name or description is missing');

        const task = await prisma.task.update({
            where: {
                id: parseInt(req.query.taskId as string)
            },
            data: {
                name: req.body.name,
                description: req.body.description
            }
        });

        return res.json({ task });
    }
    return res.status(404);
}