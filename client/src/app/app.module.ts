import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {AuthLayoutComponent} from './shared/layouts/auth-layout/auth-layout.component';
import {SiteLayoutComponent} from './shared/layouts/site-layout/site-layout.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "./shared/classes/token.interceptor";
import { DocumentPageComponent } from './document-page/document-page.component';
import { HelloPageComponent } from './hello-page/hello-page.component';
import { EducationalProgramPageComponent } from './educational_program-page/educational-program-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { EducationalProgramFormComponent } from './educational_program-page/educational-program-form/educational-program-form.component';
import { WorkingProgramPageComponent } from './educational_program-page/educational-program-form/working-program-page/working-program-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { UserFormComponent } from './user-page/user-form/user-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MyPageComponent } from './my-page/my-page.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import { DocumentFormComponent } from './document-page/document-form/document-form.component';
import { WorkingProgramFormComponent } from './educational_program-page/educational-program-form/working-program-page/working-program-form/working-program-form.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    SiteLayoutComponent,
    RegisterPageComponent,
    DocumentPageComponent,
    HelloPageComponent,
    EducationalProgramPageComponent,
    LoaderComponent,
    EducationalProgramFormComponent,
    WorkingProgramPageComponent,
    UserPageComponent,
    UserFormComponent,
    MyPageComponent,
    DocumentFormComponent,
    WorkingProgramFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgSelectModule,
    PdfViewerModule
  ],
  providers:[
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
