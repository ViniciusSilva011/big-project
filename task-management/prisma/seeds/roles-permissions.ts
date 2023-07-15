import { Permission, PrismaClient, Role, User } from "@prisma/client";
const prisma = new PrismaClient();

async function assignRoleUser(id: number, user: User) {
    await prisma.roleUser.upsert({
        where: {
            id,
        },
        update: {},
        create: {
            user_id: user.id,
            role_id: 1,
        }
    });
}

async function assignAdministrators() {
    let users = await prisma.user.findMany({
        where: {
            OR: [
                { name: "ViniciusSilva011" },
                { name: 'Marco Rodrigues' },
            ],
        },
    });
    if (users.length) {
        for (let i = 0; i < users.length; i++) {
            await assignRoleUser(i + 1, users[i]);
        }
    }
}

async function upsertRole(id: number, name: string) {
    await prisma.role.upsert({
        where: {
            id
        },
        update: {},
        create: {
            name
        }
    });
}

async function upsertPermission(id: number, name: string) {
    await prisma.permission.upsert({
        where: {
            id
        },
        update: {},
        create: {
            name
        }
    });
}

async function assignRolePermission(roleId: number, permissionId: number) {
    await prisma.permissionRole.upsert({
        where: {
            id: permissionId,
        },
        update: {},
        create: {
            permission_id: permissionId,
            role_id: roleId
        }
    });
}

async function upsertTaskPriorities(id: number, name: string, description: string) {
    await prisma.taskPriority.upsert({
        where: {
            id: id
        },
        update: {},
        create: {
            name,
            description
        }
    })
}

async function main() {

    await upsertTaskPriorities(1, "Blocker", "This priority level is used when an issue blocks progress on other work or prevents the system from functioning. It requires immediate attention");
    await upsertTaskPriorities(2, "Critical", "Issues with this priority are critical to the success of the project and need to be addressed urgently");
    await upsertTaskPriorities(3, "Major", "Issues with major priority have a significant impact on the project but are not as severe as blockers or critical issues");
    await upsertTaskPriorities(4, "Minor", "These issues have a minor impact on the project and can be resolved without affecting critical functionality");
    await upsertTaskPriorities(5, "Trivial", "Trivial issues have the least impact on the project and can be addressed at a lower priority. They may include minor enhancements or cosmetic changes");


    await upsertRole(1, "Administrator");
    await upsertRole(2, "Guest");

    await upsertPermission(1, "create-task");
    await upsertPermission(2, "read-task");
    await upsertPermission(3, "update-task");
    await upsertPermission(4, "delete-task");

    //* ADM CRUD
    await assignRolePermission(1, 1);
    await assignRolePermission(1, 2);
    await assignRolePermission(1, 3);
    await assignRolePermission(1, 4);

    //* Guest READ
    await assignRolePermission(2, 2);

    await assignAdministrators();
    console.log({
        status: 'seed for roles done!'
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
