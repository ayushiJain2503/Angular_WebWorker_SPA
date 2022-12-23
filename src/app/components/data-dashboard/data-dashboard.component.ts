import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TableDataClass } from 'src/app/classes';
import { userInput } from 'src/app/interfaces';
import { DataSocketService } from 'src/app/services';
import { updateArrayIds, updateSize, updateTimer } from 'src/app/store';

@Component({
  selector: 'app-data-dashboard',
  templateUrl: './data-dashboard.component.html',
  styleUrls: ['./data-dashboard.component.scss']
})
export class DataDashboardComponent implements OnInit {
  public transformedData: TableDataClass[] = [];
  public intervalId: any;

  public tableInputsForm: FormGroup = new FormGroup({
    timer: new FormControl('', Validators.min(1000)),
    size: new FormControl(''),
    arrayIds: new FormControl('', Validators.pattern('^[-,0-9 ]+$'))
  });
  public userInputData: userInput = {
    timer: 0,
    size: 0,
    arrayIds: []
  };

  constructor(
    private dataSocketService: DataSocketService,
    private store: Store
  ) {}

  /**
   * On component initialization, initialize worker to generate data
   * Also initialize subscription to listen to latest emitted data
   */
  public ngOnInit(): void {
    this.initializeWorker();

    this.dataSocketService.data$.subscribe((data) => {
      this.transformedData = data;
    });
  }

  /**
   * Function to update timer value in store from UI
   */
  public updateTimer(): void {
    if (
      !this.tableInputsForm?.controls?.timer?.errors &&
      this.userInputData.timer !== this.tableInputsForm.controls['timer'].value
    ) {
      this.userInputData.timer = this.tableInputsForm.controls['timer'].value;
      this.store.dispatch(updateTimer({ timer: this.userInputData.timer }));
      this.dataSocketService.clearTimer();
    }
  }

  /**
   * Function to update array size in store from UI
   */
  public updateArraySize(): void {
    if (
      this.userInputData.size !== this.tableInputsForm.controls['size'].value
    ) {
      this.userInputData.size = this.tableInputsForm.controls['size'].value;
      this.store.dispatch(updateSize({ size: this.userInputData.size }));
    }
  }

  /**
   * Function to updae elements ID array in store from UI
   * Also generate array from the string of different IDs, and trim the post or pre appended commas
   */
  public updateIdArray(): void {
    if (!this.tableInputsForm?.controls?.arrayIds?.errors) {
      this.userInputData.arrayIds = this.tableInputsForm.controls[
        'arrayIds'
      ].value
        .replace(/(^,)|(,$)/g, '')
        .split(',');
      this.store.dispatch(updateArrayIds({ ids: this.userInputData.arrayIds }));
    }
  }

  /**
   * Function to get data from the service
   * If the worker is defined then it generates data using worker otherwise we get data without worker as a fallback
   */
  private initializeWorker(): void {
    if (typeof Worker !== 'undefined') {
      this.dataSocketService.getData();
    } else {
      //Fallback to get data without web worker and display it
      this.dataSocketService.generatePseudoData();
    }
  }
}
