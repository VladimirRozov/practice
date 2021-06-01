import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {RegisterPageComponent} from "./register-page/register-page.component";
import {AuthGuard} from "./shared/classes/auth.guard";
import {DocumentPageComponent} from "./document-page/document-page.component";
import {SiteLayoutComponent} from "./shared/layouts/site-layout/site-layout.component";
import {HelloPageComponent} from "./hello-page/hello-page.component";
import {EducationalProgramPageComponent} from "./educational_program-page/educational-program-page.component";
import {EducationalProgramFormComponent} from "./educational_program-page/educational-program-form/educational-program-form.component";
import {UserPageComponent} from "./user-page/user-page.component";
import {UserFormComponent} from "./user-page/user-form/user-form.component";
import {MyPageComponent} from "./my-page/my-page.component";
import {DocumentFormComponent} from "./document-page/document-form/document-form.component";
import {WorkingProgramPageComponent} from "./educational_program-page/educational-program-form/working-program-page/working-program-page.component";

const routes: Routes = [
  {
    path: '', component:AuthLayoutComponent, children:[
      {path: '', redirectTo: '/hello', pathMatch: 'full'},
      {path: 'login', component: LoginPageComponent},
      {path: 'register', component: RegisterPageComponent},
      {path: 'docs', component: DocumentPageComponent},
      {path: 'hello', component: HelloPageComponent}
    ]
  },
  {path: '', component:SiteLayoutComponent, canActivate: [AuthGuard], children:[
      {path: 'profile', component: MyPageComponent},
      {path: 'document', component: DocumentPageComponent},
      {path: 'document/new', component: DocumentFormComponent},
      {path: 'document/:id', component: DocumentFormComponent},
      {path: 'user', component: UserPageComponent},
      {path: 'user/:id', component: UserFormComponent},
      {path: 'educational_program', component: EducationalProgramPageComponent},
      {path: 'educational_program/new', component: EducationalProgramFormComponent},
      {path: 'educational_program/:id', component: EducationalProgramFormComponent},
      {path: 'working_program/new', component: WorkingProgramPageComponent},
      {path: 'working_program/:id', component: WorkingProgramPageComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
