import { Router } from 'express';

const router = Router();

router.post('/signup');
router.post('/signin');
router.post('/signout');
router.get('/users'); // get users
router.put('/users/:id'); // Block user
router.delete('/users/:id'); // Delete user

export default router;
