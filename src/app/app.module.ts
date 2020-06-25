import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/user/users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './services/data.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from './services/toast/toast-service';
import { ToastsContainerComponent } from './components/toast/toasts-container.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ToastsContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
