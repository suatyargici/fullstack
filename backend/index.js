const mongoose = require("mongoose");
const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const path = require("path")
const User = require("./models/users")
const Post = require("./models/posts")

app.use(express.json());
app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const uri =
  "mongodb+srv://yargicisuat:Zgxgx3XkpHZSYGzb@sosyalmedya.hkzebvk.mongodb.net/socail-app";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err.message));



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
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
      password: password,
    });
    if (user == null) {
      res.status(403).json({
        message: "Email or password is wrong",
      });
    } else {
      const payload = {};
      const token = {
        token: jwt.sign(payload, secretKey, options),
      };
      res.json({
        token: token,
        user: user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



app.post("/api/post", async (req, res) => {
  try {
    const { userId, content } = req.body;
    const post = new Post({
      _id: uuidv4(),
      userId,
      content,
      createdDate:new Date().toLocaleString('tr-TR'),
    });
    const result = await post.save();
    res.json({
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/post", async (req, res) => {
  try {
    const result = await Post.aggregate([{
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "users",
      },
    }]).sort({ createdDate: -1 });
    res.json({
      result: result,
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(5000, () => console.log("Server started on port 5000"));
