import { Component, OnInit, Input } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule, Table } from 'primeng/table';
import { Search, SearchTable } from '../model/search';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements OnInit {

  @Input() licenses: Search[];
  licensesList = {
    license: [],
  };
  first: number = 0;

  constructor() { }

  ngOnInit() {
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
    this.licensesList.license = [];
    let index = 1;
    for (let license of datas.data) {
      console.log(license);
      let item = {};
      if (license.data.customerData.Customer) {
        item['juristicNo'] = license.data.customerData.Customer.JuristicNo;
        item['companyName'] = license.data.customerData.Customer.Name;
      }
      if (license.data.licenseData.Licenses) {
        for (let licenseData of license.data.licenseData.Licenses) {


          item['licenseGroupType'] = licenseData.JuristicNo;
          item['licenseNo'] = licenseData.LicenseNo;
          item['effectiveYear'] = licenseData.EffectiveYear;
          item['issueDate'] = licenseData.IssueDate;
          item['expireDate'] = licenseData.ExpireDate;
          item['fileCondition'] = licenseData.FiledCondition;

          for (let service of licenseData.Services) {
            item['no'] = index++;
            item['serviceId'] = service.ServiceName;
            this.licensesList.license.push(item);
          }

        }
      }
    }
    console.log(this.licensesList);
  }

}
