import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Candidate, Message} from "../interfaces";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})

export class UserServices {
  constructor(private http: HttpClient) {
  }

  //list of user
  fetch(): Observable<Candidate[]> {
    return this.http.get<Candidate[]>('/api/user')
  }

  getById (id: String): Observable<Candidate>{
    return this.http.get<Candidate>(`/api/user/${id}`)
  }

  update(candidate: Candidate, id: String): Observable<Candidate>{
    return this.http.patch<Candidate>(`/api/user/${id}`, candidate)
  }

  remove (id: string): Observable<Message>{
    return this.http.delete<Message>(`/api/user/${id}`)
  }
}
