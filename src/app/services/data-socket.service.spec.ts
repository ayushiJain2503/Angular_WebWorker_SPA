import { TestBed } from '@angular/core/testing';

import { DataSocketService } from './data-socket.service';
import { userInput } from '../interfaces';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

class StoreMock { 
  select =  jasmine.createSpy().and.returnValue(of({data:{
    userData: {
      size: 100,
      timer: 3000,
      arrayIds: []
    }
  }
  })); 
  dispatch = jasmine.createSpy();
}

describe('DataSocketService', () => {
  let service: DataSocketService;
  let data: userInput = {
    size: 100,
    timer: 3000,
    arrayIds: []
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{
        provide: Store,
        useClass: StoreMock,
      }]
    });
    service = TestBed.inject(DataSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call clearInterval',() => {
    const timerSpy = spyOn(window, 'clearInterval').and.callThrough();
    const getDataSpy = spyOn(service,'getData').and.callThrough();
    service.clearTimer();
    expect(timerSpy).toHaveBeenCalled();
    expect(getDataSpy).toHaveBeenCalledTimes(1);
  });

  it('getData',() => {
    service.userInputData = data;
    const generatePseudoDataWithWorkerSpy = spyOn<any>(service,'generatePseudoDataWithWorker').and.callThrough();
    service.getData();
    expect(generatePseudoDataWithWorkerSpy).toHaveBeenCalled();
    expect(generatePseudoDataWithWorkerSpy).toHaveBeenCalledTimes(1);
  });

});
