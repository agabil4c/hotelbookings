import Role from "../models/Role.js";

export const createRole = async (req, res, next) => {
    const newRole = new Role(req.body);

    try {
        const savedRole = await newRole.save();
        res.status(200).json(savedRole);
    } catch (error) {
        next(error)
        res.status(500).json(error);
    }
};

export const getRoles = async (req,res,next) => {
    try {
        const roles = await Role.find();
        if(!roles) {
            res.status(404).json("No roles found. Please create new role");
        }
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
};

export const getSingleRole = async (req,res,next) => {
    try {
        const roles = await Role.findById(req.params.id);
        if(!roles) {
            res.status(404).json(`The role with ${req.params.id} has not been found`);
        }
        res.status(200).json(roles);
    } catch (error) {
        next(error);
    }
};

export const updateSingleRole = async (req,res,next) => {
    try {
       const updateRole = await Role.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new:true}
       ); 
       const updatedRole = await Role.findById(req.params.id);
       res.status(200).json(updatedRole);
    } catch (error) {
        next(error);
    }
};

export const deleteSingleRole = async (req,res,next) => {
    try {
        const deleteRole = await Role.findByIdAndDelete(req.params.id);
        if(!deleteRole) {
            res.status(400).json("failed to delete role");
        }
        res.status(200).json("Role has been deleted.");
    } catch (error) {
        next(error);
    }
};
