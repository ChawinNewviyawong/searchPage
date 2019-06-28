import { Component, OnInit, Input } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Search, SearchTable } from '../model/search';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements OnInit {

  @Input() licenses: Search[];
  licensesList;
  first: number = 0;

  constructor() { }

  ngOnInit() {
    this.mapField(this.licenses);
  }

  reset() {
    this.first = 0;
  }

  mapField(licenses: Search[]) {
    this.licensesList = [];

    let index = 1;
    for (let license of licenses) {
      let item = {};
      item['no'] = index++;
      if (license.data.customerData.Customer) {
        item['juristicNo'] = license.data.customerData.Customer.JuristicNo;
        item['companyName'] = license.data.customerData.Customer.Name;
      }
      if (license.data.licenseData.Licenses) {
        // item.licenseData = license.data.licenseData.Licenses;
        for (let licenseData of license.data.licenseData.Licenses) {
          console.log(licenseData.LicenseNo);
          item['licenseNo'] = licenseData.LicenseNo;
          this.licensesList.push(item);
        }
      }
        // item.licenseGroupType = license.data.licenseData.Licenses[licenseIndex].LicenseGroupTypeId;
        // item.licenseNo = license.data.licenseData.Licenses[licenseIndex].LicenseNo;
        // item.serviceId = license.data.licenseData.Licenses[licenseIndex].Services;
        // item.effectiveYear = license.data.licenseData.Licenses[licenseIndex].EffectiveYear;
        // item.issueDate = license.data.licenseData.Licenses[licenseIndex].IssueDate;
        // item.expireDate = license.data.licenseData.Licenses[licenseIndex].ExpireDate;
        // item.fileCondition = license.data.licenseData.Licenses[licenseIndex].FiledCondition;
        
    }
    console.log(this.licensesList);
  }

}
