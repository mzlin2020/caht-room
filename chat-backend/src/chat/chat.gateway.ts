import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server, Socket } from 'socket.io';
import { Inject } from '@nestjs/common';
import { ChatHistoryService } from 'src/chat-history/chat-history.service';
import { UserService } from 'src/user/user.service';

interface JoinRoomPayload {
  chatroomId: number;
  userId: number;
}

interface SendMessagePayload {
  sendUserId: number;
  chatroomId: number;
  message: {
    type: 'text' | 'image' | 'file';
    content: string;
  };
}

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @Inject(ChatHistoryService)
  private chatHistoryService: ChatHistoryService;

  @Inject(UserService)
  private userService: UserService;

  // 加入聊天室
  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, payload: JoinRoomPayload): void {
    const roomName = payload.chatroomId.toString();
    client.join(roomName);

    this.server.to(roomName).emit('message', {
      type: 'joinRoom',
      userId: payload.userId,
    });
  }

  @SubscribeMessage('sendMessage')
  async sendMessage(@MessageBody() payload: SendMessagePayload) {
    const roomName = payload.chatroomId.toString();

    const map = {
      text: 0,
      image: 1,
      file: 2,
    };

    // 保存聊天记录
    const history = await this.chatHistoryService.add(payload.chatroomId, {
      content: payload.message.content,
      type: map[payload.message.type],
      chatroomId: payload.chatroomId,
      senderId: payload.sendUserId,
    });

    // 将当次聊天的用户信息查询出来
    const sender = await this.userService.findUserDetailById(history.senderId);

    this.server.to(roomName).emit('message', {
      type: 'sendMessage',
      userId: payload.sendUserId,
      message: {
        ...history,
        sender,
      },
    });
  }
}
