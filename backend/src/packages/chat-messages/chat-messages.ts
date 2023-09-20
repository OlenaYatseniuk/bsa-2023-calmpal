import { ChatMessageModel } from './chat-message.model.js';
import { ChatMessageRepository } from './chat-message.repository.js';
import { ChatMessageService } from './chat-message.service.js';

const chatMessageRepository = new ChatMessageRepository(ChatMessageModel);
const chatMessageService = new ChatMessageService(chatMessageRepository);

export { chatMessageService };
export { type ChatMessageService } from './chat-message.service.js';
export {
  type ChatMessageCreatePayload,
  type ChatMessageCreateRequestDto,
  type ChatMessageGetAllItemResponseDto,
  type ChatMessageGetAllResponseDto,
} from './libs/types/types.js';