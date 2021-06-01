import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {UserServices} from "../shared/services/user.services";
import {Candidate} from "../shared/interfaces";
import {MaterialService} from "../shared/classes/material.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  // @ts-ignore
  user$: Observable<Candidate[]>;

  constructor(private userService: UserServices,
              private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.userService.fetch()
  }


  deleteUser(id: string){
    const decision = window.confirm(`Вы уверены, что хотите удалить пользователя`)

    if (decision){

      this.userService.remove(id.toString()).subscribe(
        response=>MaterialService.toast(response.message),
        error=>MaterialService.toast(error.error.message),
        ()=>this.router.navigate(['/users'])
      )
    }
  }
}
