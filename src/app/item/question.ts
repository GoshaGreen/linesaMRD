import {QuestionBlock} from './question-block';
import {QuestionType} from './question-type';
import {Answer} from './answer';

export class Question {
  idQuestion: number;
  questionType: QuestionType;
  activatingVariant: Answer;
  answers: Answer[];
  questionText: string;
  mandatory: boolean;
}
