import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChatHistory } from '@prisma/client';

export type HistoryDto = Pick<
  ChatHistory,
  'chatroomId' | 'senderId' | 'type' | 'content'
>;

@Injectable()
export class ChatHistoryService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  //   聊天记录列表
  async list(chatroomId: number) {
    // 获取该聊天室的所有聊天记录
    const history = await this.prismaService.chatHistory.findMany({
      where: {
        chatroomId,
      },
    });

    // 获取每条聊天记录对应的用户信息
    const res = [];
    for (let i = 0; i < history.length; i++) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: history[i].senderId,
        },
        select: {
          id: true,
          username: true,
          nickName: true,
          email: true,
          createTime: true,
          headPic: true,
        },
      });
      res.push({
        ...history[i],
        sender: user,
      });
    }
    return res;
  }

  // 保存聊天记录
  async add(cahtroomId: number, history: HistoryDto) {
    return this.prismaService.chatHistory.create({ data: history });
  }
}
