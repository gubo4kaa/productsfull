import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema, type Product } from "@/entities/product/model/schema"
import { useUpdateProduct } from "@/features/product/api/useProducts"
import { useEffect } from "react"

type Props = {
  isOpen: boolean
  onClose: () => void
  initialData: Product
}

export const ProductEditForm = ({ isOpen, onClose, initialData }: Props) => {
  const updateProduct = useUpdateProduct()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema.omit({ id: true, createdAt: true })), // валидируем только поля формы без id и createdAt
    defaultValues: initialData,
  })

  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const onSubmit = (data: Omit<Product, "id" | "createdAt">) => {
    // Отправляем весь объект с id, объединяя id из initialData и обновленные данные
    updateProduct.mutate(
      {
        ...initialData,
        ...data,
        price: Number(data.price),
        quantity: Number(data.quantity),
      },
      {
        onSuccess: () => onClose(),
      }
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактировать товар</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="article">Артикул</Label>
            <Input id="article" {...register("article")} />
            {errors.article && <p className="text-sm text-red-500">{errors.article.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Название</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Цена</Label>
            <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity">Количество</Label>
            <Input id="quantity" type="number" {...register("quantity", { valueAsNumber: true })} />
            {errors.quantity && <p className="text-sm text-red-500">{errors.quantity.message}</p>}
          </div>

          <Button type="submit" className="w-full">
            Сохранить
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}