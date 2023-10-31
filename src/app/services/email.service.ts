import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId: string = 'service_042hoyp';
  private templateId: string = 'template_kk2shc8';
  private publicKey: string = 'PQLBeo4HyGEVfi1Py';
  constructor() {}

  public sendEmail(data: any): Promise<EmailJSResponseStatus> {
    return emailjs.send(this.serviceId, this.templateId, data, this.publicKey);
  }
}
