import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPerson } from '../person';
import { PersonlistService } from '../personlist.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor(
    private _personService: PersonlistService,
    private SpinnerService: NgxSpinnerService,
    private router: Router
  ) {}

  public Data: IPerson[] = [];

  public singlePersonData: IPerson[] = [];

  public pId: any;

  ngOnInit(): void {
    this.loadPerson();
  }

  getLocalData() {
    let local = JSON.parse(localStorage.getItem('Addedpersons')!);
    this.Data = local;
  }

  loadPerson() {
    this.SpinnerService.show();
    this._personService.getPersons().subscribe(
      (res: IPerson[]) => {
        console.log(
          res.forEach((person: IPerson) => {
            console.log(person);
          })
        );
        this.Data = res;
        this.SpinnerService.hide();
      },
      (err) => {
        console.log(err.message);
      }
    );
  }

  getPerson(i: any) {
    this.pId = this.Data[i].personId;
    console.log(this.pId);
    this.router.navigate([`/detail/${this.pId}`]);
    this._personService.getPersonById(this.pId).subscribe(
      (res: IPerson[]) => {
        console.log(
          res.forEach((person: IPerson) => {
            console.log(person);
          })
        );
        this.singlePersonData = res;
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}
