import Post from "../models/postModel.js";

const allPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(400).json({ error: "Something went wrong" });
  return res.status(200).json(posts);
};

const addPost = async (req, res) => {
  if (!req.body.title || !req.body.description)
    return res.status(400).json({ error: "Kolom harus diisi" });

  const newPost = await Post.create({
    title: req.body.title,
    description: req.body.description,
  });

  if (!newPost) return res.status(400).json({ error: "Something went wrong" });
  return res.status(201).json({ message: "Post added successfully", newPost });
};

const updatePost = async (req, res) => {
  const editedPost = await Post.findOneAndUpdate(
    { _id: req.params.postId },
    { title: req.body.title, description: req.body.title }
  );

  if (!editedPost)
    return res.status(400).json({ error: "Something went wrong" });

  res.status(200).json({ message: "Post updated successfully", editedPost });
};

const deletePost = async (req, res) => {
  const deletedPost = await Post.findOneAndDelete({ _id: req.params.postId });

  if (!deletedPost)
    return res.status(400).json({ error: "Something went wrong" });

  return res.status(200).json("Post deleted successfully");
};

export { allPosts, addPost, updatePost, deletePost };
