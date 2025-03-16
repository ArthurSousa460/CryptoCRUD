"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const client_1 = require("@prisma/client");
class UserRepository {
    repository;
    constructor() {
        this.repository = new client_1.PrismaClient();
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
}
exports.UserRepository = UserRepository;
