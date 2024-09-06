import { Schema } from "swagger-jsdoc";
// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   tag: string;

//   @ManyToOne(() => Customer, (customer) => customer.orders)
//   customer: Customer;

//   @Column()
//   status: string;

//   @ManyToOne(() => Shop, (shop) => shop.orders)
//   shop: Shop;

//   @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
//   orderItems: OrderItem[];

//   @Column({ type: 'timestamp' })
//   deliveryDate: Date;

//   @Column({ type: 'float', default: 0 })
//   totalAmount: number;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }

export const OrderSchema: Schema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        tag: { type: "string" },
        status: { type: "string" },
        deliveryDate: { type: "string", format: "date-time" },
        totalAmount: { type: "number" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "tag", "status", "deliveryDate", "totalAmount"],
};
