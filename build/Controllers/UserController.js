import { UserService } from "../Services/UserService.js";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserDTO } from "../DTOs/UserDTO.js";
export class UserController {
    service;
    constructor() {
        this.service = new UserService();
    }
    async list(req, res) {
        try {
            const users = await this.service.list();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(500).json({ "message": "Internal server error" });
        }
    }
    async create(req, res) {
        try {
            const dto = plainToInstance(UserDTO, req.body);
            const errors = await validate(dto);
            if (errors.length > 0) {
                const err = errors.map(err => ({
                    fieeld: err.property,
                    constraints: err.constraints
                }));
                return res.status(400).json({ "errors": err });
            }
            const user = await this.service.create(dto);
            return res.status(201).json(user);
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ "message": error.message });
            }
            return res.status(500).json({ "message": "internal server error" });
        }
    }
    async update(req, res) {
        try {
            const dto = plainToInstance(UserDTO, req.body);
            const errors = await validate(dto);
            if (errors.length > 0) {
                const err = errors.map(err => ({
                    fieeld: err.property,
                    constraints: err.constraints
                }));
                return res.status(400).json({ "errors": err });
            }
            dto.id = parseInt(req.params.id);
            res.status(200).json(await this.service.update(dto));
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ "message": error.message });
            }
            return res.status(500).json({ "message": "internal server error" });
        }
    }
    async delete(req, res) {
        try {
            const id = parseInt(req.params.id);
            await this.service.delete(id);
            return res.status(200).json({ "message": "User deleted" });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ "message": error.message });
            }
            return res.status(500).json({ "message": "internal server error" });
        }
    }
}
