import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-mw';

const router = Router();

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 1, max: 32 }),
  userController.signup,
);
router.post('/signin', userController.signin);
router.post('/signout', userController.signout);
router.get('/users', authMiddleware, userController.getUsers);
router.put('/users/block', authMiddleware, userController.toggleBlockUsers);
router.post('/users/delete', authMiddleware, userController.deleteUsers);
router.get('/refresh', userController.refresh);

export default router;
