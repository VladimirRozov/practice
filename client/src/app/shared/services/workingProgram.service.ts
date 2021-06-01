import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {WorkingProgram} from "../interfaces";

@Injectable({providedIn: 'root'})

export class WorkingProgramService {
  constructor(private http: HttpClient) {
  }

  getByEducational(ed_id: String): Observable<WorkingProgram[]>{
    return this.http.get<WorkingProgram[]>(`/api/working_program/${ed_id}`)
  }

  getById (id: String): Observable<WorkingProgram>{
    return this.http.get<WorkingProgram>(`/api/working_program/${id}`)
  }
}
