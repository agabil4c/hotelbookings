import express from "express";
import {
    getRoles,
    getSingleRole,
    createRole,
    updateSingleRole,
    deleteSingleRole
} from "../controllers/role.js";
import Role from "../models/Role.js";

const router = express.Router();

//Create Role
router.post("/",createRole);
//Get roles
router.get("/",getRoles);
//update role
router.put("/:id",updateSingleRole);
//get single role
router.get("/:id",getSingleRole);
//delete role
router.delete("/:id", deleteSingleRole);

export default router;