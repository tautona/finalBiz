import { Component, OnInit } from '@angular/core';
import {UserService } from '../user.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
  providers: [UserService]
})
export class CollectionComponent implements OnInit {
  constructor(private userService:UserService){}
  userList = null;
  title = 'angularproject';
  numUsers = 0;

  ngOnInit(){
    this.updateUserList();
  }
  updateUserList():void{
    this.userList=this.userService.listUsers().subscribe((users)=>{
      this.userList = users;
      this.numUsers = this.userList.length;
    });
  }
}
