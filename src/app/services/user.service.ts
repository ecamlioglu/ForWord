import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersPath = '/users';

  userRef: AngularFireList<User>;

  constructor(private _db: AngularFireDatabase) { 
    this.userRef = _db.list(this.usersPath);
  }

  createUser(user: User): any {
    return this.userRef.push(user);
  }

  setUserTime(key: string, value: any): Promise<void> {
    return this.userRef.update(key, value);
  }

  getAllUsers(): AngularFireList<User> {
    return this.userRef;
  }
}
