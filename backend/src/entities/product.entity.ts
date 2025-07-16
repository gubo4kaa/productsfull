import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Unique,
} from "typeorm";

@Entity()
@Unique(["article"])
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  article!: string;

  @Column()
  name!: string;

  @Column("float")
  price!: number;

  @Column("int")
  quantity!: number;

  @Column({ name: "createdat" })
  createdAt!: Date;
}
