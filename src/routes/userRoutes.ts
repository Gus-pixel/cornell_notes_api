import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} from '../controllers/userController';

const router = Router();

router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/user', createUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

export default router;
