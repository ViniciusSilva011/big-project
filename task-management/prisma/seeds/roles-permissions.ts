import { Permission, PrismaClient, Role, User } from "@prisma/client";
const prisma = new PrismaClient();

async function assignRoleUser(user: User) {
    await prisma.roleUser.create({
        data: {
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
        for (const user of users) {
            await assignRoleUser(user);
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
    await prisma.permissionRole.create({
        data: {
            permission_id: permissionId,
            role_id: roleId
        },
    });
}

async function main() {

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
