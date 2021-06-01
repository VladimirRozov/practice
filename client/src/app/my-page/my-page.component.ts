import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {of, Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserServices} from "../shared/services/user.services";
import {switchMap} from "rxjs/operators";
import { MaterialService} from "../shared/classes/material.service";
import {Candidate} from "../shared/interfaces";

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {

  // @ts-ignore
  myForm: FormGroup

  aSub: Subscription = new Subscription;
  // @ts-ignore
  candidate: Candidate
  // @ts-ignore
  login: string
  // @ts-ignore
  password: string
  // @ts-ignore
  role: string
  // @ts-ignore
  id: string = localStorage.getItem('id')

  constructor(private route:ActivatedRoute,
              private userService: UserServices,
              private router: Router) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      user_first_name: new FormControl(null, Validators.required),
      user_second_name: new FormControl(null, Validators.required),
      user_description: new FormControl(null, Validators.required),
    })

    this.route.params
      .pipe(
        switchMap(
          (params: Params)=>{
            if(localStorage.getItem('id')){
              return this.userService.getById(this.id)
            }
            return of(null)
          }
        )
      )
      .subscribe(candidate => {
        if(candidate){
          this.myForm.setValue({
            user_first_name: candidate.first_name,
            user_second_name: candidate.second_name,
            user_description: candidate.description,
          })
          this.login = candidate.login
          this.password = candidate.password
          this.role = candidate.role
          console.log(candidate)
          MaterialService.updateTextInputs()

        }

      }, error => MaterialService.toast(error.error.message))
  }

  onSubmit(){
    this.myForm.disable()
     this.candidate = {
      login: this.login,
      password: this.password,
      first_name: this.myForm.value.first_name,
      second_name: this.myForm.value.second_name,
      role: this.role,
      description: this.myForm.value.description
    }

    let obs$
    obs$ = this.userService.update(this.candidate,this.id)

    obs$.subscribe(
        candidate => {
          this.candidate = candidate
          MaterialService.toast('Изменения сохранены')
        },
        error => {
          this.myForm.enable()
          MaterialService.toast(error.error.message)
        },
        () => {
          this.myForm.reset()
          this.myForm.enable()
        }
      )
    }


}
