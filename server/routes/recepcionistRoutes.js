import { Router } from "express";
import { prisma } from "../service/prisma.js";
export const recepcionistRoutes = Router();

recepcionistRoutes.post("/register", async (req, res) => {
  const { name, username, password } = req.body;

  const recepcionist = await prisma.recepcionist.create({
    data: {
      name: name,
      username: username,
      password: password,
    },
  });
  res.json(recepcionist);
});

recepcionistRoutes.get("/get/:id", async (req, res) => {
  const { id } = req.params;
  const recepcionist = await prisma.recepcionist.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  return res.status(200).json(recepcionist);
});

recepcionistRoutes.get("/get/user/:username", async (req, res) => {
  const { username } = req.params;
  const recepcionist = await prisma.recepcionist.findUnique({
    where: {
      username: username,
    },
  });

  return res.status(200).json(recepcionist);
});

recepcionistRoutes.put("/update", async (req, res) => {
  const { id, name, username, password } = req.body;
  const updateRecepcionist = await prisma.recepcionist.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
      username: username,
      password: password,
    },
  });
  res.json(updateRecepcionist);
});

recepcionistRoutes.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deleteRecepcionist = await prisma.recepcionist.delete({
    where: {
      id: Number(id),
    },
  });
  res.json(deleteRecepcionist);
});