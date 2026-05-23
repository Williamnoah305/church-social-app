import express from 'express';

const router = express.Router();

// Get all posts
router.get('/', (req, res) => {
  // TODO: Fetch posts from database
  res.status(200).json({ posts: [] });
});

// Get single post
router.get('/:id', (req, res) => {
  // TODO: Fetch post by ID
  res.status(200).json({ post: {} });
});

// Create post
router.post('/', (req, res) => {
  // TODO: Create new post
  res.status(201).json({ message: 'Post created' });
});

// Update post
router.put('/:id', (req, res) => {
  // TODO: Update post
  res.status(200).json({ message: 'Post updated' });
});

// Delete post
router.delete('/:id', (req, res) => {
  // TODO: Delete post
  res.status(200).json({ message: 'Post deleted' });
});

// Add comment
router.post('/:id/comments', (req, res) => {
  // TODO: Add comment to post
  res.status(201).json({ message: 'Comment added' });
});

// Add reaction
router.post('/:id/reactions', (req, res) => {
  // TODO: Add reaction to post
  res.status(201).json({ message: 'Reaction added' });
});

export default router;
