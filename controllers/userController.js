import User from '../models/userModel.js';
import bcrypt from "bcrypt"; 
import jwt from 'jsonwebtoken';
import Post from '../models/postModel.js';


const createUser = async (req, res) => {
    const { email, username, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.redirect("/login");
    } catch (error) {
      res.status(500).send('Registration failed!');
    }
  };
  
  



  const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({
          succeeded: false,
          error: 'There is no such user',
        });
      }
  
    
      const same = await bcrypt.compare(password, user.password);

      if (same) {
        const token = createToken(user._id);
        res.cookie('jwt', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24,
        });
  
        res.redirect("/users/dashboard");
      } else {
        res.status(401).json({
          succeeded: false,
          error: 'Passwords do not match',
        });
      }
    } catch (error) {
      res.status(500).json({
        succeeded: false,
        error,
      });
    }
  };
  
  
  const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
  };

  const getDashboardPage = async (req, res) => {
    const posts = await Post.find({  });
  
    res.render('dashboard', {
      posts
     
    });
  };


  export {
    loginUser,
    createUser,
    createToken,
    getDashboardPage
  };