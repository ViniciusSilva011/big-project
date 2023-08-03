import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient({});
type User = { id: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const assigneeId = req.query.assigneeId as string;
    const taskId = parseInt(req.query.taskId as string)

    const assignee = await prisma.taskUser.findFirst({
        where: {
            task_id: taskId,
            user_id: assigneeId
        },
        include: {
            user: true,
            task: true
        }
    })
    if (!assignee)
        return res.status(404).json({ status: 'Not Found' });

    if (req.method === 'GET') {
        return res.json({ assignee });
    } else if (req.method === 'DELETE') {
        await prisma.taskUser.delete({
            where: {
                id: assignee.id,
                task_id: taskId,
                user_id: assigneeId
            },
            include: {
                user: true,
            }
        })

        return res.json({ assignee });
    }
}