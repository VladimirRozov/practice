import {Component, Input, OnInit} from "@angular/core";
import {Observable} from "rxjs";
import {WorkingProgram} from "../../../shared/interfaces";
import {ActivatedRoute} from "@angular/router";
import {EducationalProgramServices} from "../../../shared/services/educationalProgram.services";
import {WorkingProgramService} from "../../../shared/services/workingProgram.service";

@Component({
  selector: 'app-working-program-page',
  templateUrl: './working-program-page.component.html',
  styleUrls: ['./working-program-page.component.css']
})

export class WorkingProgramPageComponent implements OnInit {

  // @ts-ignore
  @Input('educationalId') educationalId: string

  // @ts-ignore
  working_program: WorkingProgram[] = [];

  constructor(private route:ActivatedRoute,
              private educationalService: EducationalProgramServices,
              private workingService: WorkingProgramService) { }

  ngOnInit(): void {

    this.workingService.getByEducational(this.educationalId).subscribe(working_program => {
      this.working_program = working_program
    })

  }

  get isAdmin() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "admin";
  }

}
