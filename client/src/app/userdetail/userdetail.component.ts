import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
  providers: [UserService]
})
export class UserdetailComponent implements OnInit {
  user:any;  //the user object
  editing:boolean=false;

  constructor(private route: ActivatedRoute,
              private userService: UserService ) { }

  ngOnInit(): void {
    this.getUser();
  }
  //toggle edit mode - done after a user is selected
  setEditMode(mode):void{
    this.editing = (mode ? true : false);
  }
  getUser():void{
    const param = this.route.snapshot.paramMap.get('id');
    this.userService.getUser(param)
    .subscribe((user)=> {
      this.user = user;
    });
  }
  updateUser(obj:any):void {
    this.user.username=obj.usernameField;
    this.user.firstUnit = obj.firstunitField;
    this.user.secondUnit = obj.secondunitField;
    this.userService.updateUser(this.user._id, this.user)
    .subscribe((result)=>{
      location.reload();
    });
  }
  // can't seem to ge this to reload the collection without just 'location.href="/#/"'
  deleteUser(){
    if(confirm(`Are you certain you want to remove ${this.user.username}?`)){
      console.log('deleting ${id}');
      this.userService.deleteUser(this.user._id)
      .subscribe((result)=>{
        alert(`User ${this.user.username} has been removed`);
        location.href="/#/";
      })
    }

  }

}
