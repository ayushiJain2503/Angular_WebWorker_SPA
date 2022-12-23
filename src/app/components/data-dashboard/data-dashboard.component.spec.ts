import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { of } from 'rxjs';
import { DataSocketService } from 'src/app/services';
import { DataDashboardComponent } from './data-dashboard.component';

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
describe('DataDashboardComponent', () => {
  let component: DataDashboardComponent;
  let fixture: ComponentFixture<DataDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDashboardComponent],
      providers: [{
        provide: Store,
        useClass: StoreMock,
      }, DataSocketService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit',()=> {
    const initializeWorkerSpy = spyOn<any>(component,'initializeWorker').and.callThrough();
    component.ngOnInit();
    expect(initializeWorkerSpy).toHaveBeenCalled();
    expect(initializeWorkerSpy).toHaveBeenCalledTimes(1);
  });
});
