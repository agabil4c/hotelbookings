import User from "../models/User.js";

export const updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
export const changeStatus = async (req,res,next) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updateUser);
  } catch (error) {
    next(err);
  }
}

export const getUsersCount =  async (req,res,next) => {
  var startDate = req.query.startDate;
  var endDate = req.query.endDate;
  try {
    const userCount = await User.aggregate([
      {
        $match: {createdAt : {
          $gte: new Date(startDate),
          $lt: new Date(endDate)
        }}
      },
      {
        $count: "users"
      }
    ]);
    res.status(200).json(userCount);
  } catch (error) {
    next(error);
  }
};