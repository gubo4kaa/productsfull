import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { validateDto } from '../middlewares/validation.middleware';
import { CreateProductDto } from '../dtos/product.dto';

const router = Router();

router.get('/', ProductController.getAll);
router.post('/', validateDto(CreateProductDto), ProductController.create);
router.put('/:id', validateDto(CreateProductDto), ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
