import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CurrencyRestCallsService {
	apiURL = 'https://forex.1forge.com/1.0.3';
	apiKey = 'y0mkl4phAp8pej6nVpr6qB51gVh8ZWf0'
	endpoint = ""
	
	constructor(private http: HttpClient) { }
	
	GetQuotes(params) {
	   this.endpoint = "/quotes?pairs="+params+"&api_key="+this.apiKey;
	   return this.http.get(this.apiURL+this.endpoint);
	}

	GetSymbols() {
	   this.endpoint = "/symbols?&api_key="+this.apiKey;
	   return this.http.get(this.apiURL+this.endpoint);
	}

	CurrencyConverter(from, to, amt) {
	    this.endpoint = "/convert?from="+from+"&to="+to+"&quantity="+amt+"&api_key="+this.apiKey;
		return this.http.get(this.apiURL+this.endpoint);
	}

	MarketStatus() {
		this.endpoint = "/market_status?api_key="+this.apiKey;
		return this.http.get(this.apiURL+this.endpoint);
	}
}