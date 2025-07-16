import { AppDataSource } from '../config/data-source';
import { Product } from '../entities/product.entity';

const repo = AppDataSource.getRepository(Product);

export const ProductService = {
  getAll: async (page = 1, limit = 50) => {
    const [data, total] = await repo.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  },

  create: async (data: Partial<Product>) => {
    const product = repo.create(data);
    return await repo.save(product);
  },

  update: async (id: number, data: Partial<Product>) => {
    await repo.update(id, data);
    return await repo.findOneByOrFail({ id });
  },

  delete: async (id: number) => {
    return await repo.delete(id);
  },
};
