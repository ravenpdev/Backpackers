import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { NotifyEmailDto } from './dto/notify-email.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly tranporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  constructor(private readonly configService: ConfigService) {}

  async notifyEmail({ email, text }: NotifyEmailDto) {
    await this.tranporter.sendMail({
      from: this.configService.get('SMT_USER'),
      to: email,
      subject: 'Backpackers Notifications',
      text,
    });
  }
}
