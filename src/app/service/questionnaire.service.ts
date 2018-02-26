import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visit } from '../item/visit';
import { Observable } from 'rxjs/Observable';
import { Questionnaire} from '../item/questionnaire';
import { Question} from '../item/question';
import { QuestionBlock } from '../item/question-block';
import { QuestionType } from '../item/question-type';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class QuestionnaireService {
  private Url = 'http://localhost:8080/';
  private visitUrl = this.Url + 'Visit';
  private questionnaireUrl = this.Url + 'Questionnaire';
  private questionBlockUrl = this.Url + 'QuestionBlock';
  private questionUrl = this.Url + 'Question';
  private questionTypeUrl = this.Url + 'QuestionType';

  constructor(
    private http: HttpClient ) { }

 /*
 * сервис получения анкеты,
 * запрос количества блоков
 * запроос по номеру блока?
 * */

  getVisit(id: number): Observable<Visit>  {
    const url = `${this.visitUrl}/${id}`;
    return this.http.get<Visit>(url);
  }

  getQuestionnaire(id: number): Observable<any> {
    const url = `${this.questionnaireUrl}/${id}`;
    return this.http.get<any>(url);
  }

  getQuestionBlock(id: number): Observable<QuestionBlock> {
    const url = `${this.questionBlockUrl}/${id}`;
    return this.http.get<QuestionBlock>(url);
  }

  getQuestionType(id: number): Observable<QuestionType> {
    const url = `${this.questionTypeUrl}/${id}`;
    return this.http.get<QuestionType>(url);
  }

  getQuestion(id: number): Observable<Question> {
    const url = `${this.questionUrl}/${id}`;
    return this.http.get<Question>(url);
  }

}
