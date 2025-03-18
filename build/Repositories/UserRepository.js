import { PrismaClient } from "@prisma/client";
export default class UserRepository {
    repository;
    constructor() {
        this.repository = new PrismaClient();
    }
    async list() {
        return await this.repository.user.findMany();
    }
    async create(user) {
        const newUser = await this.repository.user.create({
            data: {
                userDocument: user.userDocument,
                creditCardToken: user.creditCardToken,
                value: user.Value
            }
        });
        return newUser;
    }
    async findUserById(id) {
        const user = await this.repository.user.findFirst({
            where: {
                id: id
            }
        });
        return user;
    }
    async update(user) {
        const updatedUser = await this.repository.user.update({
            where: {
                id: user.id
            },
            data: {
                userDocument: user.userDocument,
                creditCardToken: user.creditCardToken,
                value: user.Value
            }
        });
        return updatedUser;
    }
    async delete(id) {
        const deletedUser = await this.repository.user.delete({
            where: {
                id: id
            }
        });
        return deletedUser;
    }
    async findUserByUserDocument(userDocument) {
        const user = await this.repository.user.findFirst({
            where: {
                userDocument: userDocument
            }
        });
        return user;
    }
    async findUserByCreditCardToken(creditCardToken) {
        const user = await this.repository.user.findFirst({
            where: {
                creditCardToken: creditCardToken
            }
        });
        return user;
    }
}
