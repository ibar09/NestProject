import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CommonModule } from "./common/common.module";
import { TodoModule } from "./todo/todo.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "./todo/todo-entity/todo-entity";
import { CvModule } from "./cv/cv.module";
import { UserModule } from "./user/user.module";
import { SkillModule } from "./skill/skill.module";
import { Cv } from "./cv/entities/cv.entity";
import { User } from "./user/entities/user.entity";
import { Skill } from "./skill/entities/skill.entity";
import { AuthMiddleware } from "./auth/auth.middleware";
import { BaseModule } from "./utils/utils.module";

@Module({
	imports: [
		CommonModule,
		TodoModule,
		TypeOrmModule.forRoot({
			type: "mysql",
			host: "localhost",
			port: 3306,
			username: "root",
			password: "",
			database: "tp1",
			entities: [TodoEntity, Cv, User, Skill],
			synchronize: true,
			logging: true,
		}),
		CvModule,
		UserModule,
		SkillModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(AuthMiddleware).forRoutes(
			{
				path: "cv",
				method: RequestMethod.POST,
			},
			{
				path: "cv",
				method: RequestMethod.PATCH,
			},
			{
				path: "cv",
				method: RequestMethod.DELETE,
			},
		);
	}
}
