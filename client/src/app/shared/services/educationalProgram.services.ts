import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Comment, EducationalProgram} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class EducationalProgramServices{
  constructor(private http: HttpClient) {
  }
  //list of educational program
  fetch(): Observable<EducationalProgram[]>{
    return this.http.get<EducationalProgram[]>('/api/educational_program')
  }

  getById (id: String): Observable<EducationalProgram>{
    return this.http.get<EducationalProgram>(`/api/educational_program/${id}`)
  }

  create(doc: File, program: EducationalProgram): Observable<EducationalProgram>{
    const fd = new FormData()

    fd.append('name', program.name)
    fd.append('qualification', program.qualification)
    fd.append('specialization', program.specialization)
    fd.append(' number_code', program.number_code)

    if (doc){
      fd.append('document', doc, doc.name)
    }

   return this.http.post<EducationalProgram>('/api/educational_program', fd)
  }
}
