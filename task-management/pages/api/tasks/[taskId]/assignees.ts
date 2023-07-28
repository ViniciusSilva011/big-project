import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient({});

type User = { id: string };
type Assignee = {
    id: number,
    task_id: number,
    user_id: number,
    time_total: 0,
    time_spent: 0,
    time_remaining: 0
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const taskId = parseInt(req.query.taskId as string);

    if (req.method === 'GET') {
        let assignees = await prisma.taskUser.findMany({
            where: {
                task_id: taskId
            },
            include: {
                user: true
            }
        })

        return res.json({ assignees });
    } else if (req.method === 'DELETE') {
        const assignee = await prisma.taskUser.delete({
            where: {
                id: (req.body.assignee as Assignee).id
            },
            include: {
                user: true
            }
        })

        return res.json({ assignee });
    } else if (req.method === 'POST') {
        const user = req.body.user as User;
        const assignee = await prisma.taskUser.create({
            data: {
                task_id: taskId,
                user_id: user.id,
                time_total: 0,
                time_spent: 0,
                time_remaining: 0
            }
        })

        return res.json({ assignee });
    }
}