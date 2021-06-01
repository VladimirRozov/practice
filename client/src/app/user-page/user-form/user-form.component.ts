import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UserServices} from "../../shared/services/user.services";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {of, Subscription} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  // @ts-ignore
  myForm: FormGroup

  // @ts-ignore
  selectedRole: string;
  aSub: Subscription = new Subscription;

  // @ts-ignore
  login: string
  // @ts-ignore
  password: string
  // @ts-ignore
  id: string

  role = [
    { id: 1, name: 'Пользователь', value: 'user'},
    { id: 2, name: 'Эксперт', value: 'expert' },
    { id: 3, name: 'Разработчик', value: 'teacher' },
    { id: 4, name: 'Администратор', value: 'admin' },
  ];

  constructor(private route:ActivatedRoute,
              private userService: UserServices,
              private router: Router) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      user_first_name: new FormControl(null, Validators.required),
      user_second_name: new FormControl(null, Validators.required),
      user_description: new FormControl(null, Validators.required),
      user_role: new FormControl(null, Validators.required)
    })

    this.route.params
      .pipe(
        switchMap(
          (params: Params)=>{
            if(params['id']){
              this.id = params['id']
              return this.userService.getById(params['id'])
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
            user_role: this.handlerRole(candidate.role)
          })
          this.login = candidate.login
          this.password = candidate.password
          console.log(candidate)
          MaterialService.updateTextInputs()

        }

      }, error => MaterialService.toast(error.error.message))
  }



  onUpdate(){
    this.myForm.disable()
    const candidate = {
      login: this.login,
      password: this.password,
      first_name: this.myForm.value.first_name,
      second_name: this.myForm.value.second_name,
      role: this.myForm.value.role.value,
      description: this.myForm.value.description
    }

    this.aSub = this.userService.update(candidate,this.id).subscribe(
      ()=> {
        this.router.navigate(['/user', this.id], {
        })
      },
      error => {
        console.warn(error)
        this.myForm.enable()
      }
    )
  }

  handlerRole(role: String){
    let role_name
    switch (role) {
      case 'admin': {
       role_name = 'Администратор'
        break;
      }
      case 'user': {
        role_name = 'Пользователь'
        break;
      }
      case 'expert': {
        role_name = 'Эксперт'
        break;
      }
      case 'teacher': {
        role_name = 'Разработчик'
        break;
      }
    }
    return role_name
  }


}
