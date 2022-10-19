import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private baseUrl = environment.luv2shopApiUrl;

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    const months: number[] = [];

    for (let tempMonth = startMonth; tempMonth <= 12; tempMonth++) {
      months.push(tempMonth);
    }

    return of(months);
  }

  getCreditCardYears(): Observable<number[]> {
    const years: number[] = [];
    const currentYear: number = new Date().getFullYear();
    const endYear: number = currentYear + 10;

    for (let tempYear = currentYear; tempYear <= endYear; tempYear++) {
      years.push(tempYear);
    }

    return of(years);
  }

  getCountries(): Observable<Country[]> {
    const countriesUrl = `${this.baseUrl}/countries`;

    return this.httpClient.get<GetResponseCountry>(countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(countryCode: string): Observable<State[]> {
    const statesUrl = `${this.baseUrl}/states/search/findByCountryCode?code=${countryCode}`;

    return this.httpClient.get<GetResponseState>(statesUrl).pipe(
      map(response => response._embedded.states)
    );
  }
}

interface GetResponseCountry {
  _embedded: {
    countries: Country[]
  }
}

interface GetResponseState {
  _embedded: {
    states: State[]
  }
}
