import { Component, OnInit, PipeTransform } from '@angular/core';

import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs/operators';
import { IPosts } from 'src/app/models/posts.model';
import { isBuffer } from 'util';

const routes = {
  userAPIPath: 'users'

}

declare var ol: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
form: FormGroup;
  users: IUser[];
  userDetails: IUser;
  postDetails: IPosts;
  filter = new FormControl('');
  userId: number = 0;
  constructor(private formBuilder: FormBuilder, private dataService: DataService) {

    this.createFormGroup();
   }

  ngOnInit() {
    this.getUsers();
    console.log(this.form.controls);
  }

  createFormGroup() {
    this.form = this.formBuilder.group(
        {
          name: [''],
          username: [''],
          email: [''],
          street: [''],
          suite: [''],
          city: [''],
          zipcode: ['']
        });
  }

  onSubmit(){

    let id = 0;;
    if (!this.form.valid) {
        return;
    }

    let list = this.users.filter(x => x.id === this.userId)[0];
    if (list !== undefined) {
        id = list.id;
    }

    let userDetails: IUser = {
      id: id,
      name: this.form.get('name').value,
      username: this.form.get('username').value,
      email: this.form.get('email').value,
      address: {
        street: this.form.get('street').value,
        city: this.form.get('city').value,
        suite: this.form.get('suite').value,
        zipcode: this.form.get('zipcode').value
      }
    };

if(id <= 0){
  console.log('post');
  this.dataService.post<IUser>(routes.userAPIPath, userDetails).toPromise().then(data => {
    console.log('success', data);
    this.form.reset();
    this.getUsers();
  })
} else {
  console.log('put');
  this.dataService.put<IUser>(routes.userAPIPath + "/" + id, userDetails ).toPromise().then(data => {
    console.log('success', data);
    this.form.reset();
    this.getUsers();
  })
}


  }

  getUsers(){
    this.dataService.get<IUser[]>(routes.userAPIPath).subscribe(data => {
      this.users = data;

    });
  }

  deleteUser(user: IUser){
    console.log(user);
    this.dataService.delete(routes.userAPIPath + "/" + user.id).toPromise().then(data => {
      console.log('success', data);
      this.form.reset();
      this.getUsers();
    })
  }

  editUser(user: IUser){
    this.form.get('name').patchValue(user.name);
    this.form.get('username').patchValue(user.username);
    this.form.get('email').patchValue(user.email);
    this.form.get('street').patchValue(user.address.street);
    this.form.get('city').patchValue(user.address.city);
    this.form.get('suite').patchValue(user.address.suite);
    this.form.get('zipcode').patchValue(user.address.zipcode);
    this.userId = user.id;
  }

  viewUserDetails(user: IUser){
    this.userDetails = user;
  }

  onNew(){
    this.form.reset();
    this.userId = 0;
  }

}
