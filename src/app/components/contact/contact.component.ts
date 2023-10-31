import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormControlName,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactForm: FormGroup;
  characterCount: number = 0;
  areaMaxLength: number = 300;
  nameMaxLength: number = 25;
  errorMessages: { [key: string]: string } = {
    name: '',
    email: '',
  };
  public messageSend: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService
  ) {
    this.contactForm = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(this.nameMaxLength),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      message: [
        '',
        [Validators.required, Validators.maxLength(this.areaMaxLength)],
      ],
    });

    this.contactForm.get('message')?.valueChanges.subscribe((value) => {
      if (value) {
        this.characterCount = value.length;
      } else {
        this.characterCount = 0;
      }
    });

    this.checkInitialErrors();
    console.log('siuuu');
  }

  public onSubmit() {
    if (this.contactForm.valid) {
      const emailData = {
        from_name: this.contactForm.value.name,
        from_email: this.contactForm.value.email,
        message: this.contactForm.value.message,
      };

      this.emailService.sendEmail(emailData).then((response) => {
        this.contactForm.reset();
      });
      this.messageSend = true;
    } else {
      console.log('Form Not Submitted!');
      this.checkErrors();
    }
  }

  private checkInitialErrors() {
    const nameControl = this.contactForm.get('name');
    if (nameControl) {
      if (nameControl.value === '') {
        nameControl.setErrors({ required: true });
      }
    }

    const emailControl = this.contactForm.get('email');
    if (emailControl) {
      if (emailControl.value === '') {
        emailControl.setErrors({ required: true });
      }
    }
  }

  private checkErrors() {
    const formControls = this.contactForm.controls;
    for (const field in formControls) {
      if (formControls[field] instanceof AbstractControl) {
        this.errorMessages[field] = '';
        if (formControls[field].invalid && formControls[field].touched) {
          const errors = formControls[field].errors;
          for (const errorType in errors) {
            switch (errorType) {
              case 'required':
                this.errorMessages[field] = 'Ce champ est requis.';
                break;
              case 'minlength':
                this.errorMessages[field] =
                  'Veuillez saisir au moins ' +
                  errors[errorType].requiredLength +
                  ' caractères.';
                break;
              case 'maxlength':
                this.errorMessages[field] =
                  'Vous ne pouvez pas saisir plus de ' +
                  errors[errorType].requiredLength +
                  ' caractères.';
                break;
              case 'email':
                this.errorMessages[field] =
                  'Veuillez saisir une adresse mail valide.';
                break;
              default:
                break;
            }
          }
        }
      }
    }
  }
}
