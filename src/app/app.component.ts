import { Component } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Search';

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

    $('#startDatepicker,#endDatepicker').datepicker({
      format: 'dd/mm/yyyy',
      language: 'th',
      thaiyear: true
    });

  }

}
