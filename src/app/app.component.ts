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
  formConfig = {
    licenseGroupType: '',
    licenseType: '',
    service: '',
    effectiveYear: ''
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

    this.getConfig();
  }

  getConfig() {
    this.searchService.getConfig()
      .subscribe(data => this.formConfig = {
        licenseGroupType: data['licenseGroupType'],
        licenseType: data['licenseType'],
        service: data['service'],
        effectiveYear: data['effectiveYear']
      })
  }

  search(form) {
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

}
