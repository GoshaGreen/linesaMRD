import {Question} from './question';
import {Response} from './response';
export class Answer {
  idAnswer: number;
  question: Question;
  responses: Response;
  questions: Question[];
  Variant: string;
}
