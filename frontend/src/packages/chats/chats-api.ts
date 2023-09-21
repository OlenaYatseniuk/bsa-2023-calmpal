import { APIPath, ContentType } from '#libs/enums/enums.js';
import { BaseHttpApi } from '#libs/packages/api/api.js';
import { type HTTP } from '#libs/packages/http/http.js';
import { type Storage } from '#libs/packages/storage/storage.js';

import { ChatsApiPath } from './libs/enums/enums.js';
import {
  type ChatCreateRequestDto,
  type ChatGetAllItemResponseDto,
  type ChatGetAllResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: HTTP;
  storage: Storage;
};

class ChatApi extends BaseHttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: APIPath.CHATS, baseUrl, http, storage });
  }

  public async getAllChats(query: string): Promise<ChatGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.ROOT, `?query=${query}`, {}),
      { method: 'GET', hasAuth: true },
    );

    return await response.json<ChatGetAllResponseDto>();
  }

  public async createChat(
    payload: ChatCreateRequestDto,
  ): Promise<ChatGetAllItemResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ChatsApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<ChatGetAllItemResponseDto>();
  }
}

export { ChatApi };
