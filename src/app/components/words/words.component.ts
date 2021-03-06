import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.less']
})
export class WordsComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    
  }

  play():void{
    this._router.navigate(['play']);
  }

}
