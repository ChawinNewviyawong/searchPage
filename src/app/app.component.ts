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

  searchform: Search;
  licenses: Search[];
  showTable = false;

  constructor(private http: SearchService) {}

  ngOnInit(){

    function setInputFilter(textbox, inputFilter) {
      ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
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

    setInputFilter(document.getElementById("entitynumber"), function(value) {
      return /^\d*\.?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("licensenumber"), function(value) {
      return /^\d*\.?\d*$/.test(value);
    });

    setInputFilter(document.getElementById("fullname"), function(value) {
      return /^[ก-๙]*$/.test(value);
    });

    $('#startDateFrom, #startDateTo, #endDateFrom, #endDateTo').datepicker({
      language: 'th-th',
      format: 'dd/mm/yyyy',
      autoclose: true
    });

    $('#startDateFrom')
      .datepicker()
      .on('changeDate', function(e) {
        var startDateFrom = new Date(e.date);
        $('#startDateTo').datepicker('setStartDate', startDateFrom);
      });

    $('#startDateTo')
      .datepicker()
      .on('changeDate', function(e) {
        var startDateTo = new Date(e.date);
        $('#endDateFrom').datepicker('setStartDate', startDateTo);
      });

    $('#endDateFrom')
      .datepicker()
      .on('changeDate', function(e) {
        var endDateFrom = new Date(e.date);
        $('#endDateTo').datepicker('setStartDate', endDateFrom);
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

  search(entitynumber: string, 
        fullname: string, 
        licensecategory: string, 
        licenseform: string, 
        licensenumber: string, 
        servicecategory: string, 
        yearcategory: string) {
    this.http.getLicense()
              .then(licenses => {
                this.licenses = licenses
                // check data in licenses. if empty, not show table
                if(licenses){
                  this.showTable = true;
                }
              });
  }

}
