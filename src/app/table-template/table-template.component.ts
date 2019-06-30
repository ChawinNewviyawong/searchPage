import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule, Table } from 'primeng/table';
import { Search, SearchTable } from '../model/search';
import { SearchService } from '../search.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements OnChanges {

  @Input() licenses: Search[];
  public licensesList = [];
  first: number = 0;

  constructor(private searchService: SearchService) { }

  ngOnChanges() {
    let datas = {
      data: this.licenses,
    }
    console.log(datas);
    this.mapField(datas);
  }

  reset() {
    this.first = 0;
  }

  mapField(datas) {
    this.licensesList = [];

    interface Type {
      [key: string]: any
    }

    let index = 1;
    for (let data of datas.data) {
      if (data.data.licenseData.Licenses) {
        for (let licenseData of data.data.licenseData.Licenses) {
          let item: Type = {};
          item.no = index++;
          if (data.data.customerData.Customer) {
            item.juristicNo = data.data.customerData.Customer.JuristicNo;
            item.companyName = data.data.customerData.Customer.Name;
          }
          item.licenseGroupType = licenseData.LicenseGroupTypeId;
          item.licenseNo = licenseData.LicenseNo;
          item.effectiveYear = licenseData.EffectiveYear;
          item.issueDate = licenseData.IssueDate;
          item.expireDate = licenseData.ExpireDate;
          item.fileCondition = licenseData.file;
          item.serviceId = '';
          for (let i = 0; i < licenseData.Services.length; i++) {
            if (i < licenseData.Services.length - 1) {
              item.serviceId = (item.serviceId).concat(licenseData.Services[i].ServiceName, ',');
            }
            else {
              item.serviceId = (item.serviceId).concat(licenseData.Services[i].ServiceName);
            }
          }
          this.licensesList.push(item);
        }
      }
    }
    console.log(this.licensesList);
  }

  downloadFileCondition(fileHash) {
    this.searchService.getFileCondition(fileHash)
      .subscribe(response => {
        console.log(response);
        let type = "application/pdf";
        let data = []
        data.push(response);
        // const file = document.createElement('a');
        // file.href = URL.createObjectURL(response._body);
        // file.download = 
        // let file = window.URL.createObjectURL(new Blob(data, { type: type }));
        // window.open(file);
        var file = document.createElement('a');
        file.href = window.URL.createObjectURL(new Blob(data, { type: type }));
        
        file.download = "condition" + formatDate(new Date(), 'yyyy/MM/dd', 'en');
        file.click();
      });
  }

}
