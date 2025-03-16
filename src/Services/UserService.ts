import { User } from "@prisma/client";
import UserRepository from "../Repositories/UserRepository";
import { UserDTO } from "../DTOs/UserDTO";
export class UserService {
    private repository: UserRepository;

    constructor() {
        this.repository = new UserRepository();
    }

    public async list(): Promise<User[]> {
        return await this.repository.list();
    }

    public async create(user: UserDTO): Promise<User>{
        const existUserDocument = await this.repository.findUserByUserDocument(user.userDocument);
        const existUserCreditCardToken = await this.repository.findUserByUserDocument(user.creditCardToken);

        if(existUserDocument){
            throw new Error("User already exists");
        }

        if(existUserCreditCardToken){
            throw new Error("Credit card token already exists");
        }

        return await this.repository.create(user);
    }

    public async update(user: UserDTO): Promise<User>{
        const existUser = await this.repository.findUserById(user.id);
        if(!existUser){
            throw new Error("User not found");
        }

        const updateUser = await this.repository.update(user);

        return updateUser;

    }

    public async delete(id: number): Promise<boolean>{
        const existUser = await this.repository.findUserById(id);
        if(!existUser){
            throw new Error("User not found");
        }
        await this.repository.delete(id);
        return true;
}
}