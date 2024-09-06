// @Entity()
import { Schema } from 'swagger-jsdoc';
// export class Package {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @ManyToOne(() => Shop, (shop) => shop.packages)
//   shop: Shop;

//   @ManyToMany(() => Treatment, (treatment) => treatment.packages)
//   treatments: Treatment[];

//   @OneToMany(() => OrderItem, (orderItem) => orderItem.package)
//   orderItems: OrderItem[];

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
//   orders: any;
// }

const PackageSchema: Schema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "name"],
};

export {PackageSchema};
