const User = require("../models/user.model"); // Assurez-vous que le chemin est correct
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Secret key for JWT
const JWT_SECRET = "ala123"; // Remplacez par votre propre clé secrète

exports.signupUser = async (req, res) => {
  try {
    const { fullName, email, password, code } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with role 'utilisateur' by default
    user = new User({
      fullName,
      email,
      password: hashedPassword,
      code,
      role: "utilisateur",
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { fullName, email, password, code, role } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      fullName,
      email,
      password: hashedPassword,
      code,
      role,
    });

    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { fullName, email, password, code, role, isActive } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }
    if (code) user.code = code;
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.json({ msg: "User removed" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Attempting to log in with email:", email);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("User found:", user);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Password matched");

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error("JWT signing error:", err);
        throw err;
      }

      console.log("JWT token generated:", token);

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        maxAge: 3600000, // 1 hour
      });

      console.log("Setting cookie and returning response");

      res.json({ fullName: user.fullName, role: user.role });
    });
  } catch (err) {
    console.error("Server error during login:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// User logout
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out successfully" });
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

// Update current user profile
exports.updateCurrentUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;

    const { fullName, email, password } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};
