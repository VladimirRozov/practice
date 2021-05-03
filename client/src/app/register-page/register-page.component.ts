import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  // @ts-ignore
  form: FormGroup;

  aSub: Subscription = new Subscription;

  constructor(private  auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      first_name: new FormControl(null, [Validators.required]),
      second_name: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required])
    })
  }

  ngOnDestroy() {
    if (this.aSub){
      this.aSub.unsubscribe()
    }
  }

  onSubmit(){
    this.form.disable()
    const candidate = {
      login: this.form.value.login,
      password: this.form.value.password,
      first_name: this.form.value.first_name,
      second_name: this.form.value.second_name,
      role: 'user',
      description: this.form.value.description,
    }
    this.aSub = this.auth.register(candidate).subscribe(
      ()=> {
        this.router.navigate(['/login'], {
          queryParams:{
            registered: true
          }
        })
      },
      error => {
        console.warn(error)
        this.form.enable()
      }
    )
  }

}
