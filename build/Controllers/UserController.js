"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserService_1 = require("../Services/UserService");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const UserDTO_1 = require("../DTOs/UserDTO");
class UserController {
    service;
    constructor() {
        this.service = new UserService_1.UserService();
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
            const dto = (0, class_transformer_1.plainToInstance)(UserDTO_1.UserDTO, req.body);
            const errors = await (0, class_validator_1.validate)(dto);
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
            const dto = (0, class_transformer_1.plainToInstance)(UserDTO_1.UserDTO, req.body);
            const errors = await (0, class_validator_1.validate)(dto);
            if (errors.length > 0) {
                const err = errors.map(err => ({
                    fieeld: err.property,
                    constraints: err.constraints
                }));
                return res.status(400).json({ "errors": err });
            }
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
