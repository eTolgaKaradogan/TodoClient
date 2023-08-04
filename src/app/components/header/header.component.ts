import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import dateFormat from "dateformat";
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private commonService: CommonService) {
    this.searchForm = this.formBuilder.group({
      search: '',
    });
  }
  ngOnInit() {
    this.commonService.sendSearchUpdate(this.searchForm);
  }

  searchForm;
  startDate: Date | null;
  endDate: Date | null;
  searchValue;

  detect(){
    this.commonService.sendSearchUpdate(this.searchForm);
  }

  dateRangeChange() {
    let startDate:Date | null = dateFormat(new Date(this.startDate).toUTCString(), "dd.mm.yyyy");
    let endDate: Date | null = dateFormat(new Date(this.endDate).toUTCString(), "dd.mm.yyyy");
    if(this.endDate != null)  
      this.commonService.sendDates(startDate, endDate);
  }

  async clearDates() {
    this.startDate = null;
    this.endDate = null;
    this.commonService.sendDates(this.startDate, this.endDate);
  }
}
