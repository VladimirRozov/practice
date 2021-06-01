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
  private role = 'user'
  private id = ''

  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<{token: string}>{
    return this.http.post<{token: string}>('/api/auth/login', user)
      .pipe(
        tap(
          ({token})=>{
            this.role = this.parseJwtRole(token)
            this.id = this.parseJwtId(token)
            localStorage.setItem('auth-token', token)
            localStorage.setItem('id', this.id)
            localStorage.setItem('role', this.role)
            this.setToken(token)
            this.setRole(this.role)
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
  setRole (role: string){
    this.role = role
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

   parseJwtRole(token: string) {
    try {
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      return decodedJwtData.role
    } catch (err) {
      console.log(err)
      return false;
    }
  }

  parseJwtId(token: string) {
    try {
      let jwtData = token.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)

      return decodedJwtData.userId
    } catch (err) {
      console.log(err)
      return false;
    }
  }

}
