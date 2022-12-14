import { ConfigService } from '@nestjs/config';
import { createTransport } from 'nodemailer';

import type { Transporter } from 'nodemailer';
import type SMTPTransport from 'nodemailer/lib/smtp-transport';
import type Mail from 'nodemailer/lib/mailer';

const config = new ConfigService();

async function createTransporter(): Promise<
  Transporter<SMTPTransport.SentMessageInfo>
> {
  return createTransport(
    {
      service: 'gmail',
      auth: {
        user: config.get('MAIL_ACCOUNT'),
        pass: config.get('MAIL_PASSWORD'),
      },
    },
    {
      from: config.get('MAIL_SENDER_DEFAULT'),
    },
  );
}

export async function sendMail(
  emailOptions: Mail.Options,
): Promise<SMTPTransport.SentMessageInfo> {
  const emailTransporter = await createTransporter();

  return emailTransporter.sendMail(emailOptions);
}
