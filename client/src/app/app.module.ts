import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { CollectionComponent } from './collection/collection.component';
import { NewuserComponent } from './newuser/newuser.component';

const routes:Routes = [
  { path: '', redirectTo: '/collection', pathMatch: 'full'},
  { path: 'collection', component: CollectionComponent },
  { path: 'user/:id', component : UserdetailComponent }
]
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CollectionComponent,
    UserdetailComponent,
    NewuserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
