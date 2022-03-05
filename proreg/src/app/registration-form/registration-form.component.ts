import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PersonlistService } from '../personlist.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
})
export class RegistrationFormComponent {
  persons: any = {};

  savePersonData: any = {};

  RegistrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _personService: PersonlistService,
    private SpinnerService: NgxSpinnerService
  ) {
    this.RegistrationForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthdayDate: [''],
      gender: ['', Validators.required],
      regDate: ['', Validators.required],
      email: ['', Validators.email],
      address: [''],
      phoneNumber: ['', Validators.pattern('[789][0-9]{9}')],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.RegistrationForm.value);
    this.persons = Object.assign(this.persons, this.RegistrationForm.value);
    this.addtask(this.persons);
    this.clearForm();
  }

  addtask(persons: any) {
    let RegisteredPerson: any = [];
    if (localStorage.getItem('Addedpersons')) {
      RegisteredPerson = JSON.parse(localStorage.getItem('Addedpersons')!);
      RegisteredPerson = [persons, RegisteredPerson];
    } else {
      RegisteredPerson = [persons];
    }
    localStorage.setItem('Addedpersons', JSON.stringify(RegisteredPerson));
  }

  clearForm() {
    this.RegistrationForm.reset();
  }

  savePerson() {
    this.SpinnerService.show();
    this.savePersonData = Object.assign(
      this.savePersonData,
      this.RegistrationForm.value
    );
    this._personService.addPerson(this.savePersonData).subscribe(
      (result) => {
        console.log(result);
        console.log(result);
        this.clearForm();
        this.SpinnerService.hide();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
