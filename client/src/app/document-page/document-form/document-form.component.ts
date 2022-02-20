import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MaterialService} from "../../shared/classes/material.service";
import {DocumentServices} from "../../shared/services/document.service";
import {Observable, of, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Document} from "../../shared/interfaces";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-document-form',
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.css']
})
export class DocumentFormComponent implements OnInit {

  // @ts-ignore
  @ViewChild('inputDoc') inputRef: ElementRef

  // @ts-ignore
  form: FormGroup
  // @ts-ignore
  docs: File
  isNew = true
  docsPreview = ''

  // @ts-ignore
  selectedChapter: string;
  document_id = ""
  aSub: Subscription = new Subscription;

  chapter = [
    { id: 1, name: 'ФГОС', value: 'fgos'},
    { id: 2, name: 'Образовательная программа', value: 'oop' },
    { id: 3, name: 'Рабочая программа дисциплины', value: 'rpd' },
  ];

  constructor(private route:ActivatedRoute,
              private documentService: DocumentServices,
              private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      chapter: new FormControl(null, Validators.required),
      link: new FormControl()
    })

    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              this.document_id = params['id']
              console.log(this.document_id)
              return this.documentService.getById(params['id'])
            }
            return of(null)
          }
        )
      )
      .subscribe(document => {
        if (document) {
          this.form.patchValue({
            name: document.name,
            chapter: document.chapter,
            link: document.link ? document.link : '',
            documentSrc: document.documentSrc ? document.documentSrc : ''
          })
          this.docsPreview = document.documentSrc
          console.log(document.documentSrc)
          MaterialService.updateTextInputs()
        }
      })
  }

  uploadDocument(){
    const doc = {
      name: this.form.value.name,
      chapter: this.form.value.chapter,
      link: this.form.value.link,
      documentSrc: this.form.value.inputRef? this.form.value.inputRef.name: ''
    }
    this.aSub = this.documentService.create(doc).subscribe(
      ()=> {
        this.router.navigate(['/document'], {
        })
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
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

  deleteDocument(id: string){
    const decision = window.confirm(`Вы уверены, что хотите удалить документ`)

    if (decision){

      this.documentService.remove(id.toString()).subscribe(
        response=>MaterialService.toast(response.message),
        error=>MaterialService.toast(error.error.message),
        ()=>this.router.navigate(['/users'])
      )
    }
  }

  handlerSection(section: String){
    let section_name
    switch (section) {
      case 'rpd': {
        section_name = 'Рабочая программа дисциплины'
        break;
      }
      case 'oop': {
        section_name = 'Образовательная программа'
        break;
      }
      case 'fgos': {
        section_name = 'ФГОС'
        break;
      }
    }
    return section_name
  }
}
