import { Schema} from 'swagger-jsdoc';

// @Entity()
// export class Item {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   name: string;

//   @ManyToOne(() => Shop, (shop) => shop.items) // Add relationship to Shop
//   shop: Shop;

//   @OneToMany(() => OrderItem, (orderItem) => orderItem.item)
//   orderItems: OrderItem[];

//   @OneToMany(() => TreatmentCost, (treatmentCost) => treatmentCost.item)
//   treatmentCosts: TreatmentCost[];

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }

export const ItemSchema: Schema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        name: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "name"],
};
