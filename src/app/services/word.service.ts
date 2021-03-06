import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Word } from '../models/word.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  private rdPath = '/words';

  wordsRef: AngularFireList<Word>;

  constructor(private _db: AngularFireDatabase) {
    this.wordsRef = _db.list(this.rdPath);
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
}
