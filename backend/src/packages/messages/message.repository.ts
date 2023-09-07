import { type Repository } from '#libs/types/types.js';

import { MessageEntity } from './message.entity.js';
import { type MessageModel } from './message.model.js';

class MessageRepository implements Repository {
  private messageModel: typeof MessageModel;

  public constructor(messageModel: typeof MessageModel) {
    this.messageModel = messageModel;
  }

  public find(): ReturnType<Repository['find']> {
    return Promise.resolve(null);
  }

  public async findAll(): ReturnType<Repository['findAll']> {
    return await Promise.resolve([]);
  }

  public async create(entity: MessageEntity): Promise<MessageEntity> {
    const { name, message, chatId, senderId } = entity.toNewObject();

    const chatMessage = await this.messageModel
      .query()
      .insertGraph({
        name,
        message,
        chatId,
        senderId,
      })
      .execute();

    return MessageEntity.initialize({
      id: chatMessage.id,
      name: chatMessage.name,
      message: chatMessage.message,
      chatId: chatMessage.chatId,
      senderId: chatMessage.senderId,
      createdAt: new Date(chatMessage.createdAt),
      updatedAt: new Date(chatMessage.updatedAt),
    });
  }

  public update(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }

  public delete(): ReturnType<Repository['delete']> {
    return Promise.resolve(true);
  }
}

export { MessageRepository };
