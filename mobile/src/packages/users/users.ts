import { config } from '#libs/packages/config/config';
import { http } from '#libs/packages/http/http';
import { storage } from '#libs/packages/storage/storage';

import { UserApi } from './users-api';

const userApi = new UserApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { userApi };
export {
  type UserGetAllItemResponseDto,
  type UserGetAllResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types';
export { userSignUpValidationSchema } from './libs/validation-schemas/validation-schemas';