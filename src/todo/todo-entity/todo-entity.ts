
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusEnum } from "../enum/StatusEnum";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

@Entity('Todo')
export class TodoEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    @MinLength(3,
        {message: 'name should have at least 3 characters'})
    @MaxLength(10)
    @IsNotEmpty()
    name:string;
    
    @Column()
    @MinLength(10,
        {message: 'description should have at least 10 characters'})
    @IsNotEmpty()
    description:string;
    @CreateDateColumn()
    createdAt: Date;
    @Column(
        {type:"enum",
        enum: StatusEnum,}
    )
    status: StatusEnum;


}
