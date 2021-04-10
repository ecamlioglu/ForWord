import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { map } from 'rxjs/operators';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.less']
})
export class ScoreboardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  topUsers: User[] = [];
  top10Player: User[] = [];

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this._userService.getAllUsers().snapshotChanges().pipe(
      map(changes => changes.map(
        p => ({ key: p.payload.key, ...p.payload.val() })
      ))).subscribe(data => {
        this.topUsers = data;
        this.sortTop10Player();
      });
  }

  sortTop10Player(): void {
    this.topUsers.sort((a, b) => ((Number(a.secondsToLive) > Number(b.secondsToLive)) ? 1
      : ((Number(b.secondsToLive) > Number(a.secondsToLive)) ? -1 : 0)));

    for (let index = 0; index < 10; index++) {
      const element = this.topUsers[index];
      this.top10Player.push(element);
    }
  }

}
