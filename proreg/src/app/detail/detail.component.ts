import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPerson } from '../person';
import { PersonlistService } from '../personlist.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  constructor(
    private _Activatedroute: ActivatedRoute,
    private _personService: PersonlistService,
    private SpinnerService: NgxSpinnerService,
    private router: Router
  ) {}

  public id: any;

  public personDetail: IPerson[] = [];

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe((params) => {
      this.id = params.get('id');
      console.log(this.id);
      this.getPerson(this.id);
    });
  }

  getPerson(id: any) {
    this.SpinnerService.show();
    this._personService.getPersonById(id).subscribe(
      (res: IPerson[]) => {
        console.log(
          res.forEach((person: IPerson) => {
            console.log(person);
          })
        );
        this.personDetail = res;
        this.SpinnerService.hide();
      },
      (err) => {
        console.log(err.message);
      }
    );
  }
}
