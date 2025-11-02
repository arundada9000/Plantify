import { Router } from "express";
import User, { IUser } from "../models/user";
import bcrypt from 'bcryptjs'
// import { protect, adminOnly } from "../middleware/auth"; // <-- add when ready

const router = Router();


// ---------- CREATE USER (POST /api/users) ----------
router.post('/', async (req, res) => {
  const { username, password, role = 'USER' } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user: IUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await user.save();

    const { password: _, ...safeUser } = user.toObject();
    res.status(201).json({ message: 'User created', user: safeUser });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// ---------- SOFT-DELETE USER (DELETE /api/users/:id) ----------
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    await User.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    res.json({ message: 'User deleted (soft)' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// ---------- PATCH: complete pomodoro ----------
router.patch("/:id/pomodoro", async (req, res) => {
  const { durationMinutes = 25, energySaved = 0 } = req.body; // role removed – admin only!

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $inc: {
          sessionsCompleted: 1,
          pomodorosCompleted: 1,
          totalFocusHours: durationMinutes / 60,
          energySavedMinutes: energySaved,
          energySavedKWh: energySaved / 60 / 1000,
          treesPlanted: 1,
          currentStreak: 1,
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      treesPlanted: user.treesPlanted,
      pomodorosCompleted: user.pomodorosCompleted,
      totalFocusHours: Math.round(user.totalFocusHours),
      energySavedKWh: Number(user.energySavedKWh.toFixed(2)),
      sessionsCompleted: user.sessionsCompleted,
      energySavedMinutes: user.energySavedMinutes,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- PATCH: add a plant ----------
router.patch("/:id/plant", async (req, res) => {
  const { location } = req.body; // [lng, lat]

  if (!Array.isArray(location) || location.length !== 2) {
     res.status(400).json({ message: "Invalid location format" });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    user.plants.push({ location, createdAt: now });
    user.treesPlanted += 1;
    await user.save();

    res.status(201).json({ message: "Plant added successfully", plants: user.plants });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET all users (admin only) ----------
router.get("/all", async (req, res) => {
  // protect, adminOnly  <-- add middleware when you have auth
  try {
    const users = await User.find().lean();
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET user stats ----------
router.get("/getById/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      id: user._id,
      username: user.username,
      role: user.role,
      treesPlanted: user.treesPlanted,
      currentStreak: user.currentStreak,
      pomodorosCompleted: user.pomodorosCompleted,
      totalFocusHours: user.totalFocusHours,
      energySavedKWh: user.energySavedKWh,
      sessionsCompleted: user.sessionsCompleted,
      energySavedMinutes: user.energySavedMinutes,
      plants: user.plants,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;