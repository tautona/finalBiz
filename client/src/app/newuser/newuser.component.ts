import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {

  @Output() newUser = new EventEmitter();

  user:any = {};

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  // save new user based on data from the form,  then update the collection.
  save(newuserForm) : void {
    let formData = new FormData();
    formData.append('username', this.user.username);
    formData.append('firstUnit', this.user.firstUnit);
    formData.append('secondUnit', this.user.secondUnit);

    this.userService.createUser(formData)
      .subscribe((user=>{
        console.log(user);
        this.newUser.emit();
        newuserForm.reset();
        location.href="/#/";


      }));

  }

}
