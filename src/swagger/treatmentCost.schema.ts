import { Schema } from "swagger-jsdoc";

// @Entity()
// export class TreatmentCost {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @ManyToOne(() => Treatment, (treatment) => treatment.treatmentCosts)
//   treatment: Treatment;

//   @ManyToOne(() => Item, (item) => item.treatmentCosts)
//   item: Item;

//   @Column('decimal')
//   cost: number;

  
//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }

export const TreatmentCostSchema: Schema = {
    type: "object",
    properties: {
        id: { type: "string", format: "uuid" },
        cost: { type: "number" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "cost"],
};
