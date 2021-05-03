import {Injectable} from "@angular/core";
import {Candidate, User} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string | undefined

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{token: string}>{
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token})=>{
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
  }

  register(candidate: Candidate): Observable<Candidate>{
     return this.http.post<Candidate>('/api/auth/register', candidate)
  }

  setToken (token: string){
    this.token = token
  }

  getToken(): string | undefined{
    return this.token
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  logout(){
    // @ts-ignore
    this.setToken(null)
      localStorage.clear()
  }
}
