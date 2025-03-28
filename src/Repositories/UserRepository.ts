import { PrismaClient, User } from "@prisma/client";
import { UserDTO } from "../DTOs/UserDTO.js";

export default class UserRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = new PrismaClient();
    }

    public async list(): Promise<User[]> {
        return await this.repository.user.findMany();
    }

    public async create(user: UserDTO): Promise<User>{
        const newUser =  await this.repository.user.create({
            data: {
                userDocument: user.userDocument,
                creditCardToken: user.creditCardToken,
                value: user.Value
            }
        })
        return newUser;
    }

    public async findUserById(id: number): Promise<User>{
        const user = await this.repository.user.findFirst({
            where: {
                id: id
            }
        })
        return user;
    }

    public async update(user: UserDTO): Promise<User>{
        const updatedUser = await this.repository.user.update({
            where: {
                id: user.id
            },
            data: {
                userDocument: user.userDocument,
                creditCardToken: user.creditCardToken,
                value: user.Value
            }
        })
        return updatedUser;
    }

    public async delete(id: number): Promise<User>{
        const deletedUser = await this.repository.user.delete({
            where: {
                id: id
            }
        })
        return deletedUser;
    }

    public async findUserByUserDocument(userDocument: string): Promise<User>{
        const user = await this.repository.user.findFirst({
            where: {
                userDocument: userDocument
            }
        })
        return user;
    }

    public async findUserByCreditCardToken(creditCardToken: string): Promise<User>{
        const user = await this.repository.user.findFirst({
            where: {
                creditCardToken: creditCardToken
            }
        })
        return user;
    }
}