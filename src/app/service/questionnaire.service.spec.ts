import { TestBed, inject } from '@angular/core/testing';

import { QuestionnaireService } from './questionnaire.service';

describe('QuestionnaireService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuestionnaireService]
    });
  });

  it('should be created', inject([QuestionnaireService], (service: QuestionnaireService) => {
    expect(service).toBeTruthy();
  }));
});
