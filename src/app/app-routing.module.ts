import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddWordsComponent } from './components/add-words/add-words.component';
import { PlayerComponent } from './components/player/player.component';
import { WordsComponent } from './components/words/words.component';

const routes: Routes = [
  { path: '', redirectTo: 'words', pathMatch: 'full' },
  { path: 'words', component: WordsComponent },
  { path: 'add-words', component: AddWordsComponent },
  { path: 'play', component: PlayerComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
