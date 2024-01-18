import Post from "../models/postModel.js";



const createPost = async (req, res) => {
  try {
      await Post.create({
          description: req.body.description,
      });
      res.status(201) 
      res.redirect('/users/dashboard');


  } catch (error) {
      res.status(500).json({
          succeeded: false,
          error: error.message, 
      });

  }
  console.log(req.body);
};


const getAllPost = async (req, res) => {
  try {

      const posts = await Post.find({})
      res.status(200).render('dashboard', {
          posts,
      });

  } catch (error) {

      res.status(500).json({
          succeded: false,
          error,
      })

  }
}


  export {
    createPost,
    getAllPost,
  };