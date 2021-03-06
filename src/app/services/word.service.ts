import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { User } from '../models/user.model';
import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private wordsPath = '/words';
  private usersPath = '/users';


  wordsRef: AngularFireList<Word>;
  userRef: AngularFireList<User>;

  constructor(private _db: AngularFireDatabase) {
    this.wordsRef = _db.list(this.wordsPath);
    this.userRef = _db.list(this.usersPath);
  }

  getAll(): AngularFireList<Word> {
    return this.wordsRef;
  }

  create(word: Word): any {
    return this.wordsRef.push(word);
  }

  update(key: string, value: any): Promise<void> {
    return this.wordsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.wordsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.wordsRef.remove();
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
