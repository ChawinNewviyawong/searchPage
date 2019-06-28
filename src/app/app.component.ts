import { Component, OnInit } from '@angular/core';

import { SearchService } from './search.service';

import { Search } from '../app/model/search';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Search';
  form = {
    companyName: '',
    effectiveYear: '',
    expireDateBegin: '',
    expireDateEnd: '',
    issueDateBegin: '',
    issueStartDateEnd: '',
    juristicNo: '',
    licenseGroupType: '',
    licenseNo: '',
    licenseType: '',
    service: '',
  };
  showTable = false;
  data: Search[];

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

  search(form) {

    if (form.effectiveYear == 'เลือกปีที่ได้รับอนุญาต') form.effectiveYear = null;
    if (form.licenseGroupType == 'เลือกแบบใบอนุญาต') form.licenseGroupType = null;
    if (form.licenseType == 'เลือกประเภทใบอนุญาต') form.licenseType = null;
    if (form.service == 'เลือกบริการที่ได้รับอนุญาต') form.service = null;

    let body = {};
    if (form.companyName) body['companyName'] = '*' + form.companyName + '*';
    if (form.effectiveYear) body['effectiveYear'] = form.effectiveYear;
    if (form.expireDateBegin) body['expireDateBegin'] = form.expireDateBegin;
    if (form.expireDateEnd) body['expireDateEnd'] = form.expireDateEnd;
    if (form.issueDateBegin) body['issueDateBegin'] = form.issueDateBegin;
    if (form.issueStartDateEnd) body['issueStartDateEnd'] = form.issueStartDateEnd;
    if (form.juristicNo) body['juristicNo'] = form.juristicNo;
    if (form.licenseGroupType) body['licenseGroupType'] = form.licenseGroupType;
    if (form.licenseNo) body['licenseNo'] = form.licenseNo;
    if (form.licenseType) body['licenseType'] = form.licenseType;
    if (form.service) body['serviceId'] = form.service;

    this.searchService.getLicense(body)
      .subscribe((response: Search[]) => {
        this.data = response;
        console.log(this.data);
        // this.mapFields(data);
        // check data in result. if empty, not show table
        if (response) {
          this.showTable = true;
        }
      },
        error => {
          let message = error;
          console.log('Error Message: ' + message);
        });

  }

  mapFields(datas) {
    console.log("datas: " + datas);
     let tableList = [];

    interface ColType {
      [key: string]: any
    }

    let index = 1;
    for (let data of datas) {
      console.log("data: " + data.data);
      let item: ColType = {};
      for (let i = 0; i < data.data.licenseData.Licenses.length; i++) {
        item.no = index;
        item.juristicNo = data.data.customerData.Customer.JuristicNo;
        item.companyName = data.data.customerData.Customer.Name;
        item.licenseGroupType = data.data.licenseData.Licenses.LicenseGroupType;
        item.licenseNo = data.data.licenseData.Licenses.LicenseNo;
        item.serviceId = data.data.licenseData.Licenses.Services[i];
        item.effectiveYear = data.data.licenseData.Licenses.EffectiveYear;
        item.issueDate = data.data.licenseData.Licenses.IssueDate;
        item.expireDate = data.data.licenseData.Licenses.ExpireDate;
        item.fileCondition = data.data.licenseData.Licenses.FileCondition;
        tableList.push(item);
        index++;
      }
    }
  }

}
