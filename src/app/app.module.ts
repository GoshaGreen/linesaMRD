import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent, DemoMaterialModule } from './app.component';
import { MainComponent } from './main/main.component';
import { VisitstableComponent } from './visitstable/visitstable.component';
import {ShortVisitsService} from './service/short-visits.service';

import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import {AppRoutingModule} from './app-routing.module';
import {QuestionnaireService} from './service/questionnaire.service';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    VisitstableComponent,
    QuestionnaireComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    MatButtonModule,
    HttpClientModule,
    DemoMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [ShortVisitsService, QuestionnaireService],
  bootstrap: [AppComponent]
})
export class AppModule { }


