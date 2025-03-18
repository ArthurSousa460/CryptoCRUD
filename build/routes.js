import { Router } from "express";
import { UserController } from "./Controllers/UserController.js";
const router = Router();
const userController = new UserController();
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
export default router;
