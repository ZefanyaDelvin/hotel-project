const { PrismaClient } = require("../generated/prisma");
const {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} = require("../utils/userValidation");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

exports.getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
};

exports.createUser = async (req, res) => {
  const { userName, email, phoneNum, address, password, roleId } = req.body;
  try {
    /* VALIDATION */
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      throw new Error("Invalid Email");
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      throw new Error(
        "Password must be 6-16 characters long and contain at least one number and symbol"
      );
    }

    if (phoneNum.length < 10 || phoneNum.length > 13) {
      throw new Error("Phone Number Must be 10-13 numbers long");
    }

    /* HASH PASSWORD */
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        userName,
        email,
        phoneNum,
        address,
        password: hashedPassword,
        roleId,
      },
      include: { role: true },
    });

    // don’t send password back to client
    const { password: _, ...userWithoutPassword } = newUser;

    const token = jwt.sign(
      { id: newUser.id, roleId: newUser.roleId },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res
      .status(201)
      .json({ message: "Create successful", data: userWithoutPassword });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    // create JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const data = {
      userId: user.userId,
      userName: user.userName,
      email: user.email,
      roleId: user.roleId,
      roleName: user.role.roleName,
      token,
    };

    res.status(200).json({
      message: "Login successful",
      data,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
