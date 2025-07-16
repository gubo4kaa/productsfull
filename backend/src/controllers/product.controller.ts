import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';

export const ProductController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { page = 1, limit = 50 } = req.query;
      const result = await ProductService.getAll(+page, +limit);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json(product);
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ 
          message: 'Product with this unique field already exists',
          field: error.detail
        });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const product = await ProductService.update(+req.params.id, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error: any) {
      if (error.code === '23505') {
        res.status(409).json({ 
          message: 'Product with this unique field already exists',
          field: error.detail
        });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const result = await ProductService.delete(+req.params.id);
      console.log(result)
      if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};