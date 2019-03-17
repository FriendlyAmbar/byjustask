import { AppService } from './app.service';
import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FilterPipeModule } from 'ngx-filter-pipe';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  jobs = [];
  jobListing: any[] = [];
  jobListingByExp: any[] = [];
  jobListingByLoc: any[] = [];
  locations: any[] = [];
  experience = 'all';
  location = 'all';
  companyFilter = {
    companyname: ''
  };

  constructor(private appService: AppService) { }


  sortByExperience(event) {
    this.experience = event.target.value;
  }

  sortByLocation(event) {
    this.location = event.target.value;
  }

  searchData() {
    if (this.location || this.experience) {
      if (this.location != 'all' || this.experience != 'all') {
        this.jobs = [];
        for (let i = 0; i < this.jobListing.length; i++) {
          if (this.jobListing[i].experience == this.experience || this.jobListing[i].location == this.location) {
            this.jobs.push(this.jobListing[i]);
          }
        }
      }
      else if (this.location == 'all' || this.experience == 'all' || this.location == '' || this.experience == '') {
        this.jobs = this.jobListing;
      }
    }
  }


  getJobListing() {
    this.appService.getJobsListing().subscribe(data => {
      this.jobs = data['jobsfeed'];
      this.jobListing = data['jobsfeed'];
      for (let i = 0; i < this.jobListing.length; i++) {
        if (this.jobListing[i].location != '')
          this.locations.push(this.jobListing[i].location);
      }
      for (let i = 0; i < this.locations.length; i++) {
        for (let j = this.locations.length; j > i + 1; j--) {
          if (this.locations[i] == this.locations[j]) {
            this.locations.splice(j, 1);
          }
        }
      }
    })
  }

  ngOnInit() {
    this.getJobListing();
  }
}
