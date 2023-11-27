import {
	Injectable,
	NestMiddleware,
	UnauthorizedException,
} from "@nestjs/common";
import { verify } from "jsonwebtoken";
import { constants } from "../config/constants.config";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
	use(req: any, res: any, next: () => void) {
		const header = req.headers["auth-user"];
		if (!header) return res.status(401).send("header not found");

		const token = header as string;

		try {
			const decodedToken = verify(token, constants.JWT_SECRET);
			if (decodedToken["id"]) {
				req["userId"] = decodedToken["id"];
				console.log(req["userId"]);
				next();
			} else {
				return res.status(401).send("Token Invalide");
			}
		} catch (e) {
			throw new UnauthorizedException();
		}
	}
}
