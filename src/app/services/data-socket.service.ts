import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { TableDataClass } from '../classes';
import { tableData, userInput } from '../interfaces';
import { getUserInput } from '../store';
import { filterLatestElements, generateRandomData } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class DataSocketService {
  private _data = new BehaviorSubject<TableDataClass[]>([]);
  public readonly data$ = this._data.asObservable();
  private intervalId: any;
  public userInputData: userInput = {} as userInput;

  constructor(private store: Store) {}

  /**
   * Function to generate data and also update userData from the store state
   */
  public getData(): void {
    this.store.select(getUserInput).subscribe((userInput) => {
      this.userInputData = userInput.data;
    });
    this.generatePseudoDataWithWorker();
  }

  /**
   * Function to clear Interval timer when the new timer value is set
   */
  public clearTimer(): void {
    clearInterval(this.intervalId);
    this.getData();
  }

  /**
   * Function to generate data without worker
   */
  public generatePseudoData(): void {
    let data: tableData[] = [];
    this.store.select(getUserInput).subscribe((userInput) => {
      this.userInputData = userInput.data;
    });
    this.intervalId = setInterval(
      () => {
        data = generateRandomData(
          +this.userInputData.size ? +this.userInputData.size : 100
        );
        this._data.next(data as TableDataClass[]);
      },
      +this.userInputData.timer ? +this.userInputData.timer : 3000
    );
  }

  /**
   * This function starts a new worker thread which generates large amount of data and then publish it to main thread in the set intervals
   * Main thread in turns convert data from object to class data and then emit the latest 10 elements through the subject
   * All the data generation is based on the userInput data from UI
   */
  private generatePseudoDataWithWorker(): void {
    const worker = new Worker(
      new URL('../worker/data-worker.worker', import.meta.url)
    );
    worker.onmessage = ({ data }) => {
      this._data.next(filterLatestElements(data, this.userInputData));
    };

    this.intervalId = setInterval(
      () => {
        let data: tableData[] = generateRandomData(
          +this.userInputData.size ? +this.userInputData.size : 100
        );
        worker.postMessage(data);
      },
      +this.userInputData.timer ? +this.userInputData.timer : 3000
    );
  }
}
