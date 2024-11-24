const router = require("express").Router();
const User = require("../modals/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticateToken} = require("./userAuth");

//Sign up
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // check username length is more than 4
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    // check username already exit or not
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exist" });
    }

    // check email already exit or not
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    // check password length
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length must be greater than 5" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "User Register Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// sign in
router.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          {
            name: existingUser.username,
          },
          { role: existingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookStore1234", {
          expiresIn: "30d",
        });
        return res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token});
      } else {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//get userinformation
router.get("/getuser", authenticateToken, async(req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select('-password');
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
});

//update address
router.put("/updateaddress", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    res.status(500).json({message: "Internal server error"});
  }
});

module.exports = router;
