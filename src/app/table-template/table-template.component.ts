import { Component, OnInit, Input } from '@angular/core';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { Search } from '../domain/search';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements OnInit {

  @Input() licenses: Search[];
  cols: any[];
  first: number = 0;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    
    this.cols = [
      // { field: 'No', header: 'ลำดับ'},
      { field: 'JuristicNo', header: 'เลขที่นิติบุคคล' },
      { field: 'CompanyName', header: 'ชื่อบริษัท' },
      { field: 'LicenseGroupType', header: 'ประเภทใบอนุญาต' },
      { field: 'LicenseNo', header: 'เลขที่ใบอนุญาต' },
      { field: 'ServiceId', header: 'บริการที่ได้รับอนุญาต' },
      { field: 'EffectiveYear', header: 'ปีที่ได้รับอนุญาต' },
      { field: 'IssueDate', header: 'วันที่ได้รับอนุญาต' },
      { field: 'ExpireDate', header: 'วันที่สิ้นสุดการอนุญาต' },
      { field: 'FileCondition', header: 'เงื่อนไข' }
    ]

  }

  reset() {
    this.first = 0;
  }

}
