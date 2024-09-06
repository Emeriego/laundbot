import {Schema } from "swagger-jsdoc";

// @Entity()
// export class Treatment {
  
//   @Column({ primary: true })
//   id: string;

//   @Column()
//   name: string;

//   @ManyToMany(() => Package, (pkg) => pkg.treatments)
//   @JoinTable() // This decorator specifies that this side of the relationship owns the join table
//   packages: Package[];

//   @OneToMany(() => TreatmentCost, (treatmentCost) => treatmentCost.treatment)
//   treatmentCosts: TreatmentCost[];

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
//   updatedAt: Date;
// }

export const TreatmentSchema: Schema = {
    type: "object",
    properties: {
        id: { type: "string" },
        name: { type: "string" },
        createdAt: { type: "string", format: "date-time" },
        updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "name"],
};
