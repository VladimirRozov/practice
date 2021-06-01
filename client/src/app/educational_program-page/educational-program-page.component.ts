import { Component, OnInit } from '@angular/core';
import {EducationalProgramServices} from "../shared/services/educationalProgram.services";
import {EducationalProgram} from "../shared/interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-educational-program-page',
  templateUrl: './educational-program-page.component.html',
  styleUrls: ['./educational-program-page.component.css']
})
export class EducationalProgramPageComponent implements OnInit {

  // @ts-ignore
  educational_program$: Observable<EducationalProgram[]>;

  constructor(private educationalService: EducationalProgramServices) { }

  ngOnInit(): void {
    this.educational_program$ = this.educationalService.fetch()
  }

  get isAdmin() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "admin";
  }
}
