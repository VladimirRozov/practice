import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {

  links = [
    {url: '/profile', name: 'Мой профиль'},
    {url: '/document', name: 'Документы'},
    {url: '/educational_program', name: 'Образовательные программы'}
    // {url: '/user', name: 'Пользователи'}
  ]


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get isAdmin() {
    console.log(localStorage.getItem("role"))
    return localStorage.getItem("role") === "admin";
  }

  logout(event: Event){
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
