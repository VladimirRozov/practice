import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup;

  aSub: Subscription = new Subscription;

  constructor( private auth: AuthService,
               private router: Router,
               private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })

    this.route.queryParams.subscribe( (params: Params) => {
      if (params['registered']){
        //зайтив систему со своими данными
      } else if (params['accessDenied']){
        //авторизуйтесь в системе
      } else if (params['sessionFailed']){
        //войдите в систему заново
      }
    })
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()
    const user = {
      login: this.form.value.login,
      password: this.form.value.password,
    }
    this.aSub = this.auth.login(user).subscribe(
      ()=> this.router.navigate(['/document']),
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
