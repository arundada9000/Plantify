import express from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost, likePost, commentPost } from '../controllers/postController';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);
router.post('/:id/comment', commentPost);

export default router;