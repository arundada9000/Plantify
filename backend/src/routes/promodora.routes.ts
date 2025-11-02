import { Router } from "express";
import { completeRound, createPomodoro, deletePomodoro, getAllPomodoros, pausePomodoro, resumePomodoro, startPomodoro } from "../controllers/promodora.controller";

const router = Router();

router.post("/", createPomodoro);
router.get("/", getAllPomodoros);
router.put("/:id/start", startPomodoro);
router.put("/:id/pause", pausePomodoro);
router.put("/:id/resume", resumePomodoro);
router.put("/:id/complete", completeRound);
router.delete("/:id", deletePomodoro);

export { router as pomodoroRoutes };
