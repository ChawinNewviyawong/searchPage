import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

import { HttpService } from './http.service';
import { SearchService } from './search.service';

import { NavComponent } from './nav/nav.component';
import { TableTemplateComponent } from './table-template/table-template.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TableTemplateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
    PaginatorModule
  ],
  providers: [HttpService, SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
