const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try{
    const { name, email, password } = req.body;
    if(!name || !email || !password){
      return res.status(400).json({message: "Name, email and password are required"});
    }

    const existingUser= await User.findOne({email});
    if(existingUser){
      return res.status(400).json({message: "Email already registered"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "User registered" });
    }
  catch(err){
    res.status(500).json([{message: "Server error"}]);
  }
  
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "email not registered" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
