import { Injectable } from '@angular/core';
import { jobData } from './app.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private http: HttpClient) { }
  getJobsUrl = 'https://api.myjson.com/bins/kez8a';

  getJobsListing () {
   return this.http.get(this.getJobsUrl);
  }
}
