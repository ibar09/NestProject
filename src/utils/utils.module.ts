import { Module } from "@nestjs/common";
import { Base } from "./base";

@Module({
	exports: [Base],
})
export class BaseModule {}
