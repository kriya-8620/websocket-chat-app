import express from "express";
import Room from "../models/Room.js";

const router = express.Router();

/* Create Room */

router.post(
  "/create",
  async (req, res) => {

    try {

      const { name } = req.body;

      const room =
        await Room.create({
          name
        });

      res.json(room);

    } catch (error) {

      res
        .status(500)
        .json({
          message: error.message
        });

    }

  }
);

/* Get All Rooms */

router.get(
  "/all",
  async (req, res) => {

    const rooms =
      await Room.find();

    res.json(rooms);

  }
);

export default router;