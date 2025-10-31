import { Router } from "express";
import Task from "../models/Task";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();
router.use(auth);

router.get("/", async (req: AuthRequest, res) => {
  const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
  res.json(tasks);
});

router.post("/", async (req: AuthRequest, res) => {
  const data = { ...req.body, userId: req.userId };
  const task = await Task.create(data);
  res.json(task);
});

router.put("/:id", async (req: AuthRequest, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: "Not found" });
  res.json(task);
});

router.delete("/:id", async (req: AuthRequest, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
  res.json({ ok: true });
});

router.patch("/:id/complete", async (req: AuthRequest, res) => {
  const t = await Task.findOne({ _id: req.params.id, userId: req.userId });
  if (!t) return res.status(404).json({ message: "Not found" });
  t.completed = !t.completed;
  await t.save();
  res.json(t);
});

export default router;
