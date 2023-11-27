
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusEnum } from "../enum/StatusEnum";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { constants } from "../error_messages";

export class TodoAddTDO{
    @MinLength(3,
        {message:constants.name_min_lenghth})
    @MaxLength(10)
    name:string;
    
    
    @MinLength(10,
        {message: constants.description_min_length})
    description:string;
    status: StatusEnum;
}