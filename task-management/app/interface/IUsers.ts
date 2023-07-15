import IRoles from "./IRoles";


export default interface IUser {
    id: string;
    name: string;
    email: string;
    emailVerified: string;
    avatar: string;
    roles: IRoles[];
    createdAt: string;
}

export default interface IUsers {
    users: IUser[];
}