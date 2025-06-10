import { Router } from 'express';
import {
  getFolhas,
  getFolha,
  createFolha,
  updateFolha,
  deleteFolha,
} from '../controllers/folhaController';

const router = Router();

router.get('/folha', getFolhas);
router.get('/folha/:id', getFolha);
router.post('/folha', createFolha);
router.put('/folha/:id', updateFolha);
router.delete('/folha/:id', deleteFolha);

export default router;
