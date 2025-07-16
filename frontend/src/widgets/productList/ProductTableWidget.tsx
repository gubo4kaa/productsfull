import type { Product } from "@/entities/product/model/schema";
import {
  useDeleteProduct,
  useProducts,
} from "@/features/product/api/useProducts";
import { ProductCreateForm } from "@/features/product/ui/CreateProductModal";
import { ProductEditForm } from "@/features/product/ui/EditProductModal";
import { Button } from "@/shared/ui/button";
import Spinner from "@/shared/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useState } from "react";

export const ProductTableWidget = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useProducts(page);
  const deleteMutation = useDeleteProduct();

  const handleDelete = (id: number) => {
    if (window.confirm("Удалить товар?")) {
      deleteMutation.mutate(id);
    }
  };

  // Состояния для редактирования
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // Открыть форму редактирования с выбранным продуктом
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  // Закрыть форму редактирования
  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingProduct(null);
  };

  const [isCreateOpen, setIsCreateOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full min-h-6xl min-w-6xl bg-white rounded-2xl shadow-md p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Товары</h2>
          <Button variant="default" onClick={() => setIsCreateOpen(true)}>
            Добавить товар
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Артикул</TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead>Количество</TableHead>
              <TableHead>Дата</TableHead>
              <TableHead className="">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  <span className="margin-auto flex justify-center">
                    <Spinner />
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              data?.data?.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.article}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {new Date(product.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2 items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Удалить
                    </Button>
                    <Button size="sm" onClick={() => handleEditClick(product)}>
                      Изменить
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-end space-x-2">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Назад
          </Button>
          <Button
            onClick={() => setPage((p) => p + 1)}
            disabled={data && data.data.length < 10}
          >
            Вперёд
          </Button>
        </div>
        {editingProduct && (
          <ProductEditForm
            isOpen={isEditOpen}
            onClose={handleCloseEdit}
            initialData={editingProduct}
          />
        )}
        <ProductCreateForm isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      </div>
    </div>
  );
};
