import {Doctor} from './doctor';
import {Patient} from './patient';
import {Questionnaire} from './questionnaire';

export class Visit{
  idVisit: number;
  doctor: Doctor;
  patient: Patient;
  questionnaire: Questionnaire;
  responses: Response[];
}
