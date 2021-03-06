import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { WordService } from 'src/app/services/word.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {
  @Input() name: string;
  user: User;
  started = false;
  lastGameId: number;
  users: User[];
  gameMessages: string[] = ['Oyuncu oluşturuldu!', 'Başla'];

  constructor(private _wordService: WordService,
    private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.user = new User();
    this.getLastGameId();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setUserName(name: string): void {
    this.user.name = name;
    let currentUserId: number;
    if(this.users.length == 0 || this.users.length == undefined){
      currentUserId = 0;
    }else{
      currentUserId = this.users.length + 1;
    }
    this.user.key = "word-" + currentUserId;
    this._wordService.createUser(this.user);
    this.openSnackBar('Oyuncu oluşturuldu! ', 'Başla');
    this.started = true;
  }

  getLastGameId(): void {
    this._wordService.getAllUsers().snapshotChanges().pipe(
      map(changes => changes.map(c => 
        ({key: c.payload.key, ...c.payload.val()})
      ))).subscribe(data => {
      this.users = data;
    });
  }

}
