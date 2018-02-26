import {Visit} from './visit';

export class Patient {
  idPatient: number;

  visits: Visit[];

  firstName: string;

  middleName: string;

  lastNames: string;

  birthDate: Date;
}
