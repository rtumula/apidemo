import { Component, OnInit } from '@angular/core';
import { CurrencyRestCallsService } from '../currency/currency-rest-call-service';
import { PaginationService } from '../currency/pagination.service'

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Trade-X'
  symbols = null;
  quotes: any[];
  pagination: any = {};
  pagedItems: any[];
  currentMenu = "dashboard";
  marketStatus = "Closed";
  from = "";
  to = "";
  amt = "";

  currConverterForm: FormGroup;
  cCSubmitted = false;
  conversion = null
  get cCForm() { return this.currConverterForm.controls; }

  constructor(private crcs: CurrencyRestCallsService, private paginationService: PaginationService, private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.currConverterForm = this.formBuilder.group({
            currFrom: ['', [Validators.required]],
            currTo: ['', [Validators.required]],
            currAmount: ['', [Validators.required]],
        }); 

      this.crcs.MarketStatus().subscribe(data => this.marketStatusFn(data),
      error => alert(error));

  	  this.crcs.GetSymbols().subscribe(data => this.symbols = data,
      error => alert(error));

  	  this.crcs.GetQuotes(this.symbols).subscribe(data => this.displayQuotes(data),
      error => alert(error));
  }

  marketStatusFn(status) {
    if(status.market_is_open) {
      this.marketStatus = "Open";
    }
  }

  displayQuotes(message) {
    this.quotes = message;
    this.setPage(1);
  }

  setPage(page: number) {
        this.pagination = this.paginationService.getPager(this.quotes.length, page);

        this.pagedItems = this.quotes.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
  }

  changeMenu(menu) {
    if(menu=="dashboard") {
      this.cCSubmitted = false;
    }
  	this.currentMenu = menu;
  }

  cCSubmit() {
        this.cCSubmitted = true;
        if (this.currConverterForm.invalid) {
            return;
        }
        this.from = this.currConverterForm.controls.currFrom.value
        this.to = this.currConverterForm.controls.currTo.value
        this.amt = this.currConverterForm.controls.currAmount.value

        if (this.symbols.indexOf(this.from+this.to) >= 0  ) {
          this.crcs.CurrencyConverter(this.from, this.to, this.amt).subscribe(data => this.conversion = data,
          error => alert(error));
        } else {
           alert("Please enter valid currency codes.");
        }

        
    }

}
