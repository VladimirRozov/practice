import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {WorkingProgramService} from "../../../../shared/services/workingProgram.service";

@Component({
  selector: 'app-working-program-form',
  templateUrl: './working-program-form.component.html',
  styleUrls: ['./working-program-form.component.css']
})
export class WorkingProgramFormComponent implements OnInit {
  // @ts-ignore
  @ViewChild('inputfile') inputRef: ElementRef
  isNew = true
  // @ts-ignore
  form: FormGroup
  // @ts-ignore
  docs: File
  constructor(private route:ActivatedRoute,
              private workingService: WorkingProgramService) { }

  ngOnInit(): void {
  }

  get isWorker() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "expert";
  }
  get isUser() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "user";
  }
  get isTeacher() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "teacher";
  }
  onSubmit(){

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
