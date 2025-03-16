"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("./Controllers/UserController");
const router = (0, express_1.Router)();
const userController = new UserController_1.UserController();
router.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcomer to the API",
        status: "OK"
    });
});
router.get("/users", async (req, res) => { await userController.list(req, res); });
router.post("/users", async (req, res) => { await userController.create(req, res); });
router.put("/users/:id", async (req, res) => { await userController.update(req, res); });
router.delete("/users/:id", async (req, res) => { await userController.delete(req, res); });
exports.default = router;
