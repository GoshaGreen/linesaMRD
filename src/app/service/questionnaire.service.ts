import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visit } from '../item/visit';
import { Observable } from 'rxjs/Observable';
import { Questionnaire} from '../item/questionnaire';
import { Question} from '../item/question';
import { QuestionBlock } from '../item/question-block';
import { QuestionType } from '../item/question-type';
import {Doctor} from '../item/doctor';

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
  private doctorUrl = this.Url + 'Doctor';

  constructor(
    private http: HttpClient ) { }

 /*
 * сервис получения анкеты,
 * запрос количества блоков
 * запроос по номеру блока?
 * */

  getAnys(text: String): Observable<any> {
    const url = `${this.Url}/${text}`;
    return this.http.get<any>(url);
  }

  getVisit(id: number): Observable<Visit>  {
    const url = `${this.visitUrl}/${id}`;
    return this.http.get<Visit>(url);
  }

  getDoctor(id: number): Observable<Doctor> {
    const url = `${this.doctorUrl}/${id}`;
    return this.http.get<Doctor>(url);
  }

  getQuestionnaire(id: number): Observable<Questionnaire> {
    const url = `${this.questionnaireUrl}/${id}`;
    return this.http.get<Questionnaire>(url);
  }
}
