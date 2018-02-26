import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from '../service/questionnaire.service';
import { QuestionBlock } from '../item/question-block';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnDestroy, OnInit {
  sub: Subscription;
  id: number;
  questionBlocks: QuestionBlock[];
  blocksAmount: number;
  questionnaireNumb = 2;

  constructor(private route: ActivatedRoute, private QService: QuestionnaireService) {
    this.questionBlocks = [];
    this.id = +this.route.snapshot.paramMap.get('id');
      /*  if (this.id === 0 ) {console.log(this.QService.getQuestionnaire(2)); this.questionBlocks = [];
            /!*this.QService.getQuestionnaire(1)[0].questionBlocks;*!/
          } else { this.questionBlocks = this.QService.getVisit(this.id)[0].questionnaire.questionBlocks; }  */
  }

  ngOnInit() {
    if (this.id === 0) {
      console.log(this.questionnaireNumb);
      console.log('   ' + this.QService.getQuestionnaire(this.questionnaireNumb)[0] );
      console.log('   ' + this.QService.getQuestionnaire(this.questionnaireNumb)[1] );
      console.log('   ' + this.QService.getQuestionnaire(this.questionnaireNumb)[2] );

      this.questionBlocks = this.QService.getQuestionnaire(this.questionnaireNumb)[0].questionBlocks;
    } else {
      this.questionBlocks = this.QService.getVisit(this.id)[0].questionnaire.questionBlocks;
    }
    this.blocksAmount = this.questionBlocks.length;
    console.log(this.QService.getQuestionnaire(2)[0]);
    /*
    this.createBlock(this.questionBlocks[0].idQuestionBlock);*/
  }

  createBlock(id: number) {

  }

  createNext() {

  }

  hasNext() {

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
