import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from '../service/questionnaire.service';
import {Subscription} from 'rxjs/Subscription';
import {Questionnaire} from '../item/questionnaire';
import {Doctor} from '../item/doctor';
import {QuestionBlock} from '../item/question-block';
import {Question} from '../item/question';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css'],
})
export class QuestionnaireComponent implements OnDestroy, OnInit {
  sub: Subscription;
  id: number;
  questionnaireNumb = 2;
  que: Questionnaire;
  checked: boolean[] = [false, false];
  currentBlock = 0;
  savable = false;
  inptText: string[] = ['', ''];
  doctors: Doctor[];

  constructor(private route: ActivatedRoute, private QService: QuestionnaireService) {
    this.id = +this.route.snapshot.paramMap.get('id');

  }

  ngOnInit() {
    this.sub = this.QService.getQuestionnaire(this.questionnaireNumb).subscribe(elements => {
      this.que = elements;
    });
    this.sub = this.QService.getAnys('Doctor').subscribe( docs => {
      this.doctors = docs;
    });
  }

  nextButton() {
    this.currentBlock = this.currentBlock + 1;
  }

  prevButton() {
    this.currentBlock = this.currentBlock - 1;
  }

  saveButton() {
    this.currentBlock = this.currentBlock;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
