import Post from "../models/postModel.js";



const createPost = async (req, res) => {
    try {
        const { description } = req.body;
        const user = res.locals.user._id;

        const post = new Post({
            description,
            user: user,
        });

        const savedPost = await post.save();

        res.status(201)
        res.redirect('/users/dashboard');
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
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
};


  export {
    createPost,
    getAllPost,
  };