import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EducationalProgramServices} from "../../shared/services/educationalProgram.services";
import {switchMap} from "rxjs/operators";
import {of} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";
import {EducationalProgram} from "../../shared/interfaces";


@Component({
  selector: 'app-educational-program-form',
  templateUrl: './educational-program-form.component.html',
  styleUrls: ['./educational-program-form.component.css']
})
export class EducationalProgramFormComponent implements OnInit {

  // @ts-ignore
  @ViewChild('inputfile') inputRef: ElementRef

  // @ts-ignore
  form: FormGroup
  // @ts-ignore
  docs: File
  isNew = true
  docsPreview = ''
  // @ts-ignore
  educational: string



  constructor(private route:ActivatedRoute,
              private educationalService: EducationalProgramServices) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })

    //this.form.disabled

    this.route.params
      .pipe(
        switchMap(
          (params: Params)=>{
            if(params['id']){
              this.isNew = false
              this.educational = params['id']
              return this.educationalService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(educationalProgram => {
        if(educationalProgram){
          this.form.patchValue({
            name: educationalProgram.name,
            documentSrc: educationalProgram.documentSrc
          })
          this.docsPreview = educationalProgram.documentSrc
          console.log(educationalProgram.documentSrc)
          MaterialService.updateTextInputs()
        }

        if(this.isAdmin){
          //this.form.enable()
        }

      }, error => MaterialService.toast(error.error.message))
  }

  onSubmit(){

  }


  get isAdmin() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "admin";
  }

  triggerClick(){
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: Event){
    // @ts-ignore
    const file = event.target.files[0]
    this.docs = file

    const reader = new FileReader()

    reader.onload =()=>{
      // @ts-ignore
      this.docsPreview = reader.result
    }

    reader.readAsDataURL(file)
  }

}
