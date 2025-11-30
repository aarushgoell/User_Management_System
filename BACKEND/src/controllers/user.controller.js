const { User } = require("../models/user.model");
const { hashPass } = require("../Service/hashing");
const { UserSchema, userUpdateSchema } = require("../Validation/userzod");

const getUsers = async (req, res) => {
  try {
    const { pag, lim, search } = await req.query;
    let query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    if (!search.trim().length) {
      query = {};
    }

    const allUsers = await User.find(query)
      .skip((pag - 1) * lim)
      .limit(lim)
      .select({
        name: 1,
        email: 1,
        phone: 1,
        createdAt: 1,
      });
    res.status(200).json({
      allUsers,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const inpCheck = UserSchema.safeParse(req.body);
    if (!inpCheck.success) {
      return res.status(401).json({
        message: "Data is invalid",
      });
    }

    const { name, email, password, phone } = req.body;
    const userExistCheck = await User.find({ email: email });
    if (userExistCheck.length > 0) {
      return res.status(409).json({
        message: "User already exist",
      });
    }
    const hashedPass = await hashPass(password);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: hashedPass,
    });
    return res.status(201).json({
      message: "New user added",
      newUser: { name: newUser.name, email: newUser.email },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { success } = userUpdateSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Data is in not correct format",
      });
      t;
    }

    const objectLength = Object.keys(req.body).length;
    if (!objectLength) {
      return res.status(400).json({
        message: "Please Enter some field to update",
      });
    }

    if (req.body.email) {
      const userExistCheck = await User.find({ email: req.body.email });
      if (userExistCheck.length > 0) {
        return res.status(409).json({
          message: "User already exist",
        });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({
      updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndDelete(userId);
    if (updatedUser) {
      return res.status(200).json({
        message: "User is removed",
      });
    } else {
      return res.status(200).json({
        message: "User doesnt exist",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  createUser,
};
