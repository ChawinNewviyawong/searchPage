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
      { field: 'entitynumber', header: 'เลขที่นิติบุคคล' },
      { field: 'company', header: 'ชื่อบริษัท' },
      { field: 'licensecategory', header: 'ประเภทใบอนุญาต' },
      { field: 'licensenumber', header: 'เลขที่ใบอนุญาต' },
      { field: 'service', header: 'บริการที่ได้รับอนุญาต' },
      { field: 'year', header: 'ปีที่ได้รับอนุญาต' },
      { field: 'dayofissue', header: 'วันที่ได้รับอนุญาต' },
      { field: 'expireddate', header: 'วันที่สิ้นสุดการอนุญาต' },
      { field: 'condition', header: 'เงื่อนไข' }
    ]

  }

  reset() {
    this.first = 0;
  }

}
