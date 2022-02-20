import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Document, EducationalProgram} from "../shared/interfaces";
import {DocumentServices} from "../shared/services/document.service";
import {EducationalProgramServices} from "../shared/services/educationalProgram.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.css']
})
export class DocumentPageComponent implements OnInit {
  public href: string = "";
  // @ts-ignore
  docsFGOS$: Observable<Document[]>;
  // @ts-ignore
  docs$: Observable<Document[]>;
  // @ts-ignore
  docsOOP$: Observable<Document[]>;
  // @ts-ignore
  docsRPD$: Observable<Document[]>;

  flagOOP = true
  flagFGOS = true
  flagRPD = true

  constructor(private documentService: DocumentServices,
              private educationalService: EducationalProgramServices,
              private router: Router) { }

  ngOnInit(): void {
    this.href = this.router.url;
    console.log(this.href);

    switch (this.href){
      case '/document/rpd':{
        this.flagOOP = false
        this.flagFGOS = false
        break;
      }
      case '/document/oop':{
        this.flagFGOS = false
        this.flagRPD =false
        break;
      }
      case '/document/fgos':{
        this.flagOOP = false
        this.flagRPD =false
        break;
      }
    }

    this.docsFGOS$ = this.documentService.getByChapter('fgos')
    this.docsOOP$ = this.documentService.getByChapter('oop')
    this.docsRPD$ = this.documentService.getByChapter('rpd')

  }

  get isAdmin() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "admin";
  }

}
