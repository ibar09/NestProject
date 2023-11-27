
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusEnum } from "../enum/StatusEnum";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";
import { constants } from "../error_messages";
import { PartialType } from "@nestjs/mapped-types";
import { TodoAddTDO } from "./TodoAddTDO";

export class TodoUpdateTDO extends PartialType(TodoAddTDO) {
    


}
