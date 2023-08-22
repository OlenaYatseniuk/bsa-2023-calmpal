import { BaseConfig } from '#libs/packages/config/base-config.package.js';
import { logger } from '#libs/packages/logger/logger.js';
import { JWTService } from '#packages/auth/jwt.service.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const config = new BaseConfig(logger);
const jwtService = new JWTService(config.ENV.AUTH.JWT_SECRET);
const userService = new UserService(userRepository, jwtService);
const userController = new UserController(logger, userService);

export { userController, userService };
export {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
export { userSignUpValidationSchema } from './libs/validation-schemas/validation-schemas.js';
export { UserModel } from './user.model.js';
