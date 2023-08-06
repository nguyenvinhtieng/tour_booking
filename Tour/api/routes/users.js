import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
  getUserInfo,
  addMoney,
  getDataWallet,
  cancelTour
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkauthentication", verifyToken, (req,res,next)=>{
  res.send("hello user, you are logged in")
})

router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
  res.send("hello user, you are logged in and you can delete your account")
})

router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
  res.send("hello admin, you are logged in and you can delete all accounts")
})

router.get("/get-user-info", verifyToken, getUserInfo)
router.get("/get-data-wallet", verifyToken, getDataWallet)
router.post("/add-money", verifyToken, addMoney)
router.post("/cancel-tour", verifyToken, cancelTour)
//UPDATE
router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", verifyUser, deleteUser);

//GET
router.get("/:id", verifyUser, getUser);

//GET ALL
router.get("/", verifyAdmin, getUsers);

export default router;
