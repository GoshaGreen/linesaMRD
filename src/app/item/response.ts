import {Answer} from './answer';
import {Visit} from './visit';

export class Response {
  idResponse: number;
  answer: Answer;
  visit: Visit;
  textAnswer: string;
  dateAnswer: string;
}
