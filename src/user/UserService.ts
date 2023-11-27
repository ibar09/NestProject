import {
	ConflictException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import { CrudService } from "../common/crud.service";
import { User } from "./entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
import { UserLoginDto } from "./dto/user.login.dto";
import { JwtService } from "@nestjs/jwt";
import { constants } from "../config/constants.config";
@Injectable()
export class UserService extends CrudService<User> {
	constructor(
		@InjectRepository(User) private userRepository: Repository<User>,
		private jwtService: JwtService,
	) {
		super(userRepository);
	}
	override async create(createUserDto: CreateUserDto): Promise<User> {
		const user = this.userRepository.create(createUserDto);
		console.log(createUserDto);

		const salt = await bcrypt.genSalt();
		user.password = await bcrypt.hash(user.password, salt);

		try {
			return await super.create(user);
		} catch (e) {
			throw new ConflictException("User already exists!");
		}
	}
	async login(userLogin: UserLoginDto) {
		const user = await this.userRepository.findOne({
			where: [
				{
					username: userLogin.username,
				},
				{
					email: userLogin.username,
				},
			],
		});

		if (!user) throw new UnauthorizedException("Username or email are wrong!");
		if (await bcrypt.compare(userLogin.password, user.password)) {
			const payload = {
				id: user.id,
				username: user.username,
				email: user.email,
				password: user.password,
			};
			const jwt = this.jwtService.sign(payload, {
				secret: constants.JWT_SECRET,
			});
			return jwt;
		} else throw new UnauthorizedException("Password is wrong!");
	}

	async update(id: number, updatedUserDto: UpdateUserDto) {
		const User = await this.findOne(id);
		if (!User) throw new NotFoundException();
		const updatedUser = this.userRepository.merge(User, updatedUserDto);

		return await this.userRepository.save(updatedUser);
	}
}
