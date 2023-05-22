require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process,
    cloud_api_key: process.env.CLOUDINARY_API_KEY,
    cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
});

const store = async (req, res) => {
    const { title, description, category } = req.body;
    const tags = req.body.tags.split(',');
    const images = req.files.map((file) => ({
      url: file.path,
      public_id: file.name,
    }));
    const post = {
      title,
      description,
      category,
      tags,
      images,
    };
    try {
      const createdPost = await Post.create(post);
      const postId = createdPost.id;
      res.status(201).json({ message: 'Post created successfully', postId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error occurred' });
    }
  }
  

const deleteIcon = async (req, res) => {
    const { public_id } = req.params;
    try {
        const imageRemove = await cloudinary.uploader.destroy(public_id);
        res.json(imageRemove);
    } catch (error) {
        if (error && error.name === "Remove failed") {
            res.json({
                error: error,
                message: error.message,
                field: error.errors
            })
        }
    }
};

module.exports = {
    deleteIcon
}