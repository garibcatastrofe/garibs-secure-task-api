import { Router } from 'express';
import { ClsTaskController } from './ClsTaskController';

const controller = new ClsTaskController();
const router = Router();

router.post('/task', controller.insertTaskAsync);
router.post('/tasks/', controller.selectTasksAsync);
router.get('/task/:id', controller.selectTaskByIdAsync);
router.put('/task/:id', controller.updateTaskAsync);
router.delete('/task/:id', controller.deleteTaskAsync);

export { router as TaskRouter };
