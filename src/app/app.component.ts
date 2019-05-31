import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';

import { Response } from '../app/model/search';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Search';

  data: Response[];
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
    service: string) {

    if (effectiveYear == 'เลือกปีที่ได้รับอนุญาต') effectiveYear = null;
    if (licenseGroupType == 'เลือกแบบใบอนุญาต') licenseGroupType = null;
    if (licenseType == 'เลือกประเภทใบอนุญาต') licenseType = null;
    if (service == 'เลือกบริการที่ได้รับอนุญาต') service = null;

    let body = {};
    if (companyName) body['companyName'] = '*' + companyName + '*';
    if (effectiveYear) body['effectionYear'] = effectiveYear;
    if (expireDateBegin) body['expireDateBegin'] = expireDateBegin;
    if (expireDateEnd) body['expireDateEnd'] = expireDateEnd;
    if (issueDateBegin) body['issueDateBegin'] = issueDateBegin;
    if (issueStartDateEnd) body['issueStartDateEnd'] = issueStartDateEnd;
    if (juristicNo) body['juristicNo'] = juristicNo;
    if (licenseGroupType) body['licenseGroupType'] = licenseGroupType;
    if (licenseNo) body['licenseNo'] = licenseNo;
    if (licenseType) body['licenseType'] = licenseType;
    if (service) body['serviceId'] = service;

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
