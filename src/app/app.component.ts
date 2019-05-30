import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';

import { Search } from '../app/domain/search';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Search';

  data: Search[];
  showTable = false;

  constructor(private searchService: SearchService) { }

  ngOnInit() {

    function setInputFilter(textbox, inputFilter) {
      ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
          }
        });
      });
    }

    setInputFilter(document.getElementById("juristicNo"), function (value) {
      return /^\d*\.?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("licenseNo"), function (value) {
      return /^\d*\.?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("companyName"), function (value) {
      return /^[ก-๙]*$/.test(value);
    });

    $('#issueDateBegin, #issueStartDateEnd, #expireDateBegin, #expireDateEnd').datepicker({
      language: 'th-th',
      format: 'dd/mm/yyyy',
      autoclose: true
    });

    $('#issueDateBegin')
      .datepicker()
      .on('changeDate', function (e) {
        var issueDateBegin = new Date(e.date);
        $('#issueDateBegin').datepicker('setStartDate', issueDateBegin);
      });

    $('#issueStartDateEnd')
      .datepicker()
      .on('changeDate', function (e) {
        var issueDateEnd = new Date(e.date);
        $('#issueStartDateEnd').datepicker('setStartDate', issueDateEnd);
      });

    $('#expireDateBegin')
      .datepicker()
      .on('changeDate', function (e) {
        var expireDateBegin = new Date(e.date);
        $('#expireDateEnd').datepicker('setStartDate', expireDateBegin);
      });

  }

  // getData(entitynumber: string, fullname: string, licensecategory: string, licenseform: string, licensenumber: string, servicecategory: string, yearcategory: string) {
  //   if (licensecategory == "เลือกประเภทใบอนุญาต") licensecategory = ""
  //   if (licenseform == "เลือกแบบใบอนุญาต") licenseform = ""
  //   if (servicecategory == "เลือกบริการที่ได้รับอนุญาต") servicecategory = ""
  //   if (yearcategory == "เลือกปีที่ได้รับอนุญาต") yearcategory = ""
  //   this.searchlicense.entitynumber = entitynumber
  //   this.searchlicense.name = fullname
  //   this.searchlicense.licensecategory = licensecategory
  //   this.searchlicense.licenseform = licenseform
  //   this.searchlicense.licensenumber = licensenumber
  //   this.searchlicense.servicecategory = servicecategory
  //   this.searchlicense.yearcategory = yearcategory
  //   // this.searchlicense.dateofissue.startdate = ...
  //   // this.searchlicense.dateofissue.enddate = ...
  //   // this.searchlicense.dateofexpire.startdate = ...
  //   // this.searchlicense.dateofexpire.enddate ...

  //   this.http.get()
  // }

  // {
  //   "clientID": 0,
  //   "companyName": "string",
  //   "effectiveYear": "string",
  //   "expireDateBegin": "dd/MM/yyyy",
  //   "expireDateEnd": "dd/MM/yyyy",
  //   "issueDateBegin": "dd/MM/yyyy",
  //   "issueStartDateEnd": "dd/MM/yyyy",
  //   "juristicNo": "string",
  //   "licenseGroupType": "string",
  //   "licenseNo": "string",
  //   "licenseType": "string",
  //   "serviceId": "string"
  // }
  search(companyName: string,
    effectiveYear: string,
    expireDateBegin: string,
    expireDateEnd: string,
    issueDateBegin: string,
    issueStartDateEnd: string,
    juristicNo: string,
    licenseGroupType: string,
    licenseNo: string,
    licenseType: string,
    serviceId: string) {

      console.log(juristicNo);
    this.searchService.getLicense(juristicNo)
      .subscribe(data => {
        this.data = data
        // check data in result. if empty, not show table
        if (data) {
          this.showTable = true;
        }
      });

      console.log(JSON.stringify(this.data));
  }

}
