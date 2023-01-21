import { Router } from 'express';
import { body } from 'express-validator';
import userController from '../controllers/user-controller';
import authMiddleware from '../middlewares/auth-mw';

const router = Router();

router.post(
  '/signup',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.signup,
);
router.post('/signin', userController.signin);
router.post('/signout', userController.signout);
router.get('/users', authMiddleware, userController.getUsers);
router.put('/users/:id', authMiddleware, userController.toggleBlockUser);
router.delete('/users/:id', authMiddleware, userController.deleteUser);

export default router;
