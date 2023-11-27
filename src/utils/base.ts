import { DeleteDateColumn, UpdateDateColumn } from "typeorm";

export class Base {
	@UpdateDateColumn()
	updatedAt: Date;
	@DeleteDateColumn()
	deletedAt: Date;
}
