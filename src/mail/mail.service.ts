import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";


@Injectable()
export class MailService {
  transporter: string
  constructor(private mailService: MailerService) {
  }

  async sendActivationMail(to, link) {
    await this.mailService.sendMail({
      to: to,
      subject: 'Активація профілю на ' + process.env.API_URL,
      text: '',
      html: `
                    <div>
                        <h1>Для активації перейдіть за посиланням</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
    });
  }
}
