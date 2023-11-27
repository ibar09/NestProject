import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectRepository(User)
		private userRepository: Repository<User>,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "test",
		});
	}

	async validate(payload: any) {
		const user = await this.userRepository.findOneBy({
			username: payload.username,
		});

		if (user) {
			const { password, ...result } = user;
			return result;
		} else {
			throw new UnauthorizedException();
		}
	}
}
