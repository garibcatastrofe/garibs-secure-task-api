import { Router } from 'express';
import { ClsUserController } from './ClsUserController';

const controller = new ClsUserController();
const router = Router();

router.post('/user', controller.insertUserAsync);
router.post('/users/', controller.selectUsersAsync);
router.get('/user/:id', controller.selectUserByIdAsync);
router.put('/user/:id', controller.updateUserAsync);
router.delete('/user/:id', controller.deleteUserAsync);

router.post('/signIn', controller.signInAsync);
router.get('/verify', controller.verifyAsync);
router.post('/signOut', controller.signOutAsync);

export { router as UserRouter };
