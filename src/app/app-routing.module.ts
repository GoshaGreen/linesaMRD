import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import {MainComponent} from './main/main.component';


const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'questionnaire/:id', component: QuestionnaireComponent},
  { path: 'main', component: MainComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
