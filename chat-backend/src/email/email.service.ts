import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com', //需开启 smtp、imap 等服务。示例：https://service.mail.qq.com/detail/0/428
      port: 587,
      secure: false,
      auth: {
        user: 'your email',
        pass: '授权码',
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '聊天室',
        address: 'your email',
      },
      to,
      subject,
      html,
    });
  }
}
