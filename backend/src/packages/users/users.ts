import { config } from '#libs/packages/config/config.js';
import { encrypt as encryptService } from '#libs/packages/encrypt/encrypt.js';
import { jwtService } from '#libs/packages/jwt/jwt.js';
import { logger } from '#libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService({
  userRepository,
  jwtService,
  encryptService,
  config,
});
const userController = new UserController(logger, userService);

export { userController, userService };
export {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
export { userSignUpValidationSchema } from './libs/validation-schemas/validation-schemas.js';
export { UserModel } from './user.model.js';
