import { Router } from 'express';
import { ClsUserController } from './ClsUserController';

const controller = new ClsUserController();
const router = Router();

router.post('/user', controller.insertUserAsync);
router.get('/users/', controller.selectUsersAsync);
router.get('/user/:id', controller.selectUserByIdAsync);
router.put('/user/:id', controller.updateUserAsync);
router.delete('/user/:id', controller.deleteUserAsync);

export { router as UserRouter };
