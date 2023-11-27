import { Module } from "@nestjs/common";
import { UserService } from "./UserService";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Cv } from "../cv/entities/cv.entity";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

@Module({
	imports: [
		TypeOrmModule.forFeature([Cv, User]),
		JwtModule.register({
			secret: process.env.SECRET,
			signOptions: {
				expiresIn: 3600,
			},
		}),
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [UserController],
	providers: [UserService],
})
export class UserModule {}
