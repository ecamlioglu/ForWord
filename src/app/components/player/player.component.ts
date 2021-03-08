import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { WordService } from 'src/app/services/word.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { delay, map } from 'rxjs/operators';
import { Word } from 'src/app/models/word.model';
import { WordsLength } from 'src/app/models/words-length.model';
import { LevelWords } from 'src/app/models/level-words.model';
import { CountdownComponent } from 'ngx-countdown';
@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {
  @Input() name: string;

  @ViewChild('cd', { static: false }) countdown: CountdownComponent;
  gameTime = 300; // this time is secondly

  predictedVal: string;

  user: User;
  started = false;
  isKnew = false;
  timerStarted = false;
  sessionDone = true;
  finishedGame = false;
  lastGameId: number;

  wordPoint: number;
  sessionCount: number;
  expectedlyWordLength = 4;
  currentWord: Word = new Word();

  playerPoint = 0;

  levels = WordsLength;
  levelWords: LevelWords;
  letters: any[];
  question: string;

  users: User[];
  words: Word[] = [];

  randomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  constructor(private _wordService: WordService,
    private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    this.user = new User();
    this.levelWords = new LevelWords();
    this.sessionCount = 1;
    this.getLastGameId();
    this.getWords();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  setUserName(name: string): void {
    if(!name){
      return;
    }
    this.user.name = name;
    let currentUserId: number;
    if (this.users.length == 0 || this.users.length == undefined) {
      currentUserId = 0;
    } else {
      currentUserId = this.users.length + 1;
    }
    this.user.gameId = "word-" + currentUserId;
    this.openSnackBar('Oyuna başlayabilirsiniz!', 'Başla');
    this.started = true;
  }

  getLastGameId(): void {
    this._wordService.getAllUsers().snapshotChanges().pipe(
      map(changes => changes.map(c =>
        ({ key: c.payload.key, ...c.payload.val() })
      ))).subscribe(data => {
        this.users = data;
      });
  }

  getWords(): void {
    this._wordService.getAll().snapshotChanges().pipe(
      map(changes => changes.map(
        p => ({ key: p.payload.key, ...p.payload.val() })
      ))).subscribe(data => {
        this.words = data;
      });
    this.setWordsToLengths();
  }

  setWordsToLengths(): void {
    this.words.forEach(element => {
      let wordSize = element.word.length;
      if (wordSize === this.levels.level_1) {
        if (!this.levelWords.level_1.some(p => p.word == element.word)) {
          this.levelWords.level_1.push(element);
        }
      } else if (wordSize === this.levels.level_2) {
        if (!this.levelWords.level_2.some(p => p.word == element.word)) {
          this.levelWords.level_2.push(element);
        }
      } else if (wordSize === this.levels.level_3) {
        if (!this.levelWords.level_3.some(p => p.word == element.word)) {
          this.levelWords.level_3.push(element);
        }
      } else if (wordSize === this.levels.level_4) {
        if (!this.levelWords.level_4.some(p => p.word == element.word)) {
          this.levelWords.level_4.push(element);
        }
      } else if (wordSize === this.levels.level_5) {
        if (!this.levelWords.level_5.some(p => p.word == element.word)) {
          this.levelWords.level_5.push(element);
        }
      } else if (wordSize === this.levels.level_6) {
        if (!this.levelWords.level_6.some(p => p.word == element.word)) {
          this.levelWords.level_6.push(element);
        }
      } else if (wordSize === this.levels.level_7) {
        if (!this.levelWords.level_7.some(p => p.word == element.word)) {
          this.levelWords.level_7.push(element);
        }
      }
    });
  }

  getWordForLevels(input: number): void {
    if (input === 4) {
      this.currentWord = this.levelWords.level_1[this.randomInt(0, this.levelWords.level_1.length)];
    } else if (input === 5) {
      this.currentWord = this.levelWords.level_2[this.randomInt(0, this.levelWords.level_2.length)];
    } else if (input === 6) {
      this.currentWord = this.levelWords.level_3[this.randomInt(0, this.levelWords.level_3.length)];
    } else if (input === 7) {
      this.currentWord = this.levelWords.level_4[this.randomInt(0, this.levelWords.level_4.length)];
    } else if (input === 8) {
      this.currentWord = this.levelWords.level_5[this.randomInt(0, this.levelWords.level_5.length)];
    } else if (input === 9) {
      this.currentWord = this.levelWords.level_6[this.randomInt(0, this.levelWords.level_6.length)];
    } else if (input === 10) {
      this.currentWord = this.levelWords.level_7[this.randomInt(0, this.levelWords.level_7.length)];
    }
    if(!this.currentWord){
      this.getWordForLevels(input);
    }
    this.letters = Array.from(this.currentWord.word);
    this.question = this.currentWord.question;
    console.log(this.currentWord);
  }

  gameController(): void {
    this.getWords();
    delay(50);
    if (this.started) {
      if (this.sessionDone) {
        this.getWordForLevels(this.expectedlyWordLength);
        this.wordPoint = this.currentWord.word.length * 100;
        this.isKnew = false;
        if (this.sessionCount == 2) {
          this.expectedlyWordLength++;
          this.sessionCount = 0;
        }
        this.sessionCount++;
        this.sessionDone = false;
        console.log(this.playerPoint, "point", this.wordPoint, "wordpoint", this.expectedlyWordLength, "wordlength", this.sessionCount, "session count");
      }
    }
  }

  wordController(word: string): void {
    if (this.currentWord.word == word) {
      this.isKnew = true;
      this.playerPoint += this.wordPoint;
      this.wordPoint = 0;
      this.sessionDone = true;
      
      this.gameController();
    } else {
      return;
    }
  }


  isHintTaken(): void {
    this.wordPoint -= 100;
  }

  hint(): void {

  }

  gameTimer(): void {
    if (this.countdown.config.leftTime <= 0) {
      this.finishGame();
    }
  }

  finishGame(): void {
    this.started = false;
    this.countdown.pause();
    const finishedTime = 300000 - this.countdown.left;
    console.log(finishedTime);
    this.user.secondsToLive = finishedTime.toString();
    this._wordService.createUser(this.user).then(
      this.openSnackBar("Oyun bitti!", "Kapat")
    ).catch(err => console.log(err));
  }

  countdownStart(): void{
    this.timerStarted = true;
    this.gameController();
  }

}
