import UserRepository from "../Repositories/UserRepository.js";
export class UserService {
    repository;
    constructor() {
        this.repository = new UserRepository();
    }
    async list() {
        return await this.repository.list();
    }
    async create(user) {
        const existUserDocument = await this.repository.findUserByUserDocument(user.userDocument);
        const existUserCreditCardToken = await this.repository.findUserByUserDocument(user.creditCardToken);
        if (existUserDocument) {
            throw new Error("User already exists");
        }
        if (existUserCreditCardToken) {
            throw new Error("Credit card token already exists");
        }
        return await this.repository.create(user);
    }
    async update(user) {
        const existUser = await this.repository.findUserById(user.id);
        if (!existUser) {
            throw new Error("User not found");
        }
        const updatedUser = await this.repository.update(user);
        return updatedUser;
    }
    async delete(id) {
        const existUser = await this.repository.findUserById(id);
        if (!existUser) {
            throw new Error("User not found");
        }
        await this.repository.delete(id);
        return true;
    }
}
