import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word.model';
import { WordService } from 'src/app/services/word.service';

@Component({
  selector: 'app-add-words',
  templateUrl: './add-words.component.html',
  styleUrls: ['./add-words.component.less']
})
export class AddWordsComponent implements OnInit {

  word: Word = new Word();
  submitted = false;
  completed = false;

  constructor(private _wordService: WordService) { }

  ngOnInit(): void {
  }

  saveWord(): void {
    this._wordService.create(this.word).then(() => {
      console.log("This word created successfully!", this.word);
      this.submitted = true;
    });
  }

  newWord(): void {
    this.submitted = false;
    this.word = new Word();
  }

}
