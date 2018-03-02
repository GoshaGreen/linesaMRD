import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visit } from '../item/visit';
import { Observable } from 'rxjs/Observable';
import { Questionnaire} from '../item/questionnaire';
import { Question} from '../item/question';
import { QuestionBlock } from '../item/question-block';
import { QuestionType } from '../item/question-type';
import {Doctor} from '../item/doctor';
import {Patient} from '../item/patient';
import {Answer} from '../item/answer';
import {Testt} from '../item/testt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'})
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

  saveVisit(visit: Visit): Observable<Visit> {
    console.log('service save Visit not in good condition');
    console.log(visit);
    return this.http.post<Visit>(this.visitUrl, visit, httpOptions);
  }

  addPatient (patient: Patient): Patient {
    console.log('patient saver bad');
    return patient;
  }

  getAnswer(): Observable<Answer> {
    console.log('answer getting method ' + this.Url + 'Answer/7');
    return this.http.get<Answer>(this.Url + 'Answer/7');
  }

  addAnswer(answer: Answer): Observable<Answer> {
    console.log('answer saving method');
    console.log(answer);
    return this.http.post<Answer>(this.Url + 'Answer', answer, httpOptions);
  }

  sendTestt(testt: Testt): Observable<Testt> {
    console.log('send');
    console.log(this.Url + 'Testt');
    return this.http.put<Testt>(this.Url + 'Testt', testt, httpOptions);
  }
}
