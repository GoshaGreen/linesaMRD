import {Component, OnDestroy, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionnaireService } from '../service/questionnaire.service';
import {Subscription} from 'rxjs/Subscription';
import {Questionnaire} from '../item/questionnaire';
import {Doctor} from '../item/doctor';
import {QuestionBlock} from '../item/question-block';
import {Question} from '../item/question';
import {Visit} from '../item/visit';
import { Responce } from '../item/response';
import {LocalResponce} from '../item/local-responce';
import {Patient} from '../item/patient';

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
/**/  checked: boolean[] = [false, false];
  currentBlock = 0;
  savable = false;
  doctors: Doctor[];
  visit: Visit;
  localResp: LocalResponce[] = [ null, null ];
  DBG = true;
  pat: Patient;

  constructor(private route: ActivatedRoute, private QService: QuestionnaireService) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    if (this.id === 0 ) {
      this.sub = this.QService.getQuestionnaire(this.questionnaireNumb).subscribe(elements => {
        this.que = elements;
        this.que.questionBlocks.forEach(qB => {
          qB.questions.forEach( qs => {
            this.localResp[qs.idQuestion] = new LocalResponce([], []);
            console.log(this.localResp[qs.idQuestion]);
          });
        });
      });
    } else {
      this.sub = this.QService.getVisit(this.id).subscribe( elements => {
        this.visit = elements;
        this.que = elements.questionnaire;
        this.que.questionBlocks.forEach(qB => {
          qB.questions.forEach(qs => {
            this.localResp[qs.idQuestion] = new LocalResponce([], []);
          });
        });

        if (!(!this.visit.patient)) {
          console.log('patient exist');
          this.visit.responses.push(new Responce(7, '', 1, this.visit.patient.firstName, ''));
          this.visit.responses.push(new Responce(1, '', 2, this.visit.patient.middleName, ''));
          this.visit.responses.push(new Responce(2, '', 3, this.visit.patient.lastName, ''));
          this.visit.responses.push(new Responce(2, '', 4, this.visit.patient.birthDate.toString(), ''));
          if (this.visit.responses.filter(ans => ans.question === 13).length > 0 ) {
            console.log('id answer ya');
            this.visit.responses.filter(ans => ans.question === 13)[0].textAnswer = this.visit.patient.idPatient.toString();
          } else {
            console.log('no id answer');
            this.visit.responses.push(new Responce(7, '', 13, this.visit.patient.idPatient.toString(), ''));
          }
        } else {
          console.log('patient unexist');
          if (this.visit.responses.filter(ans => ans.question === 13).length > 0) {
            console.log('pantientos');
            this.sub = this.QService.getAnys(
              'Patient/' + this.visit.responses.filter(ans => ans.question === 13)[0].textAnswer)
              .subscribe( pats => {
                this.localResp[1].answer[0] = pats.firstName;
                this.localResp[2].answer[0] = pats.middleName;
                this.localResp[3].answer[0] = pats.lastName;
                this.localResp[4].answer[0] = pats.birthDate.toString();
            });
          }
        }

        console.log(this.visit.responses);
        this.visit.responses.forEach((item , index) => {
         /* console.log('index:' + index + ' que N: ' + item.question + ' answer: ' + item.answer + ' textA: ' + item.textAnswer);
          console.log('localRESP: ' + this.localResp[item.question]);*/
          if (this.localResp[item.question] == null) {
            console.log('==');
            this.localResp[item.question] = new LocalResponce([], [item.answer]);
          } else {
            if (item.textAnswer != null) { this.localResp[item.question].answer[0] = item.textAnswer; }
            if (item.answer != null) { this.localResp[item.question].answer.push(item.answer); }
          }
        });
        this.visit.questionnaire.questionBlocks.forEach(qB => {
          qB.questions.forEach( qs => {
            if (qs.questionType.idQuestionType === 2 ) {
              this.visit.responses.forEach((item , index) => {
                if (item.question === qs.idQuestion) {
                  this.localResp[item.question].chk[item.answer] = true;
                }
              });
            }
          });
        });
      });
    }
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
    // doctor
    this.visit.doctor = this.doctors.filter(doc => doc.idDoctor == this.localResp[12].answer[0] )[0];
    // patient
    if (!this.visit.patient) {
      this.visit.patient.firstName = this.localResp[1].answer[0];
      this.visit.patient.middleName = this.localResp[2].answer[0];
      this.visit.patient.lastName = this.localResp[3].answer[0];
      this.visit.patient = this.QService.addPatient(this.visit.patient);
    }
    // resps
    console.log(this.localResp);
    this.visit.responses = [];
    this.localResp.forEach((item , questionId) => {
      console.log(questionId);
      if (questionId === 0 || questionId === 1 || questionId === 2 || questionId === 3 || questionId === 4 ) {} else {
        if (item.answer.length !== 0 || item.chk.length !== 0 ) {
          console.log(item);
          item.answer.forEach((textAnswer, txtIndex) => {
            console.log(questionId, '', questionId, textAnswer, '',  new Responce(questionId, '', questionId, textAnswer, '' ));
            this.visit.responses.push(new Responce(questionId, '', questionId, textAnswer, '' ));
          });
          item.chk.forEach((chkAnswer, chkIndex) => {
            if (chkAnswer) {
              this.visit.responses.push(new Responce(questionId, chkIndex.toString(), questionId, '', '' ));
            }
          });

      /*        item.chk.forEach((chkAnswer, chkIndex) => {
                if (chkAnswer) {
                  this.visit.responses.push(new Responce(questionId, chkIndex.toString(), questionId, '', '' ));
                }
              });*/
        }
      }
    });
    this.QService.saveVisit(this.visit);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
