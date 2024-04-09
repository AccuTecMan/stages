import { Injectable } from '@angular/core';

import { TimeStamp } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public isValidDate(timestamp: TimeStamp): boolean {
    const date = this.convertToTimestamp(timestamp);
    return date > new Date(2000, 1, 1);
  }

  public convertToTimestamp(timestamp: TimeStamp): Date {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    return new Date(milliseconds);
  }

}
