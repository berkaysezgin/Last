import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonDirective } from './directives/button.directive';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HighlightDirective } from './directives/highlight.directive';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { SharedRoutingModule } from './shared-routing.module';
import { StoreModule } from '@ngrx/store';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { sharedReducers } from './store/shared.reducers';

@NgModule({
  declarations: [NavbarComponent,
    LoginPageComponent,
    MainLayoutComponent,
    HighlightDirective,
    ButtonDirective,
  TodoItemComponent,
TodoListComponent,
],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forRoot(sharedReducers), 
  ],
  exports:[NavbarComponent,MainLayoutComponent,HighlightDirective,ButtonDirective],
})
export class SharedModule { }
