const mongoose = require("mongoose");
const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://yargicisuat:Zgxgx3XkpHZSYGzb@sosyalmedya.hkzebvk.mongodb.net/socail-app";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));

const userSchema = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  avatar: Object,
});
const User = mongoose.model("user", userSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const secretKey = "Secret key secret key 12345";
const options = {
  expiresIn: "1h",
};

  // Register
app.post("/api/register", upload.single("avatar"), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({
      _id: uuidv4(),
      name,
      email,
      password,
      avatar: req.file,
    });

    const result = await user.save();
    const payload = {
      user: result,
    };
    const token = {
      token: jwt.sign(payload, secretKey, options),
    };
    res.json({
      token: token,
      user: result,
    });
  } catch {
    res.status(500).json({ message: error.message });
  }
});


  // Login
  app.post("/api/login",async(req,res)=>{
    const user = await user.findOne({
      email:req.body.email,
    })

  })


app.listen(5000, () => console.log("Server started on port 5000"));
