import { Schema } from 'swagger-jsdoc';


// @Entity()
// export class Customer {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   firstname: string;

//   @Column()
//   lastname: string;

//   @Column()
//   address: string;

//   @Column()
//   phone: string;

//   @Column({ unique: true })
//   email: string;

//   @ManyToMany(() => Shop, (shop) => shop.customers)
//   shops: Shop[];

//   @OneToMany(() => Order, (order) => order.customer)
//   orders: Order[];

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }

const CustomerSchema: Schema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        firstname: { type: "string" },
        lastname: { type: "string" },
        address: { type: "string" },
        phone: { type: "string" },
        email: { type: "string", format: "email" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "firstname", "lastname", "email"],
};

export { CustomerSchema };
