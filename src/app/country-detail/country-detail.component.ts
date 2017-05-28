import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AppDataService } from '../services/app-data.service';
import { Country } from '../view-models/country'; 
import { FieldDefinition }  from '../../fw/dynamic-forms/field-definition';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.css']
})
export class CountryDetailComponent implements OnInit {
  operation: string;
  country: Country;
  errorMessage: string;
  countryDefinition: Array<FieldDefinition> = [
    {
      key: 'id',
      type: 'number',
      isId: true,
      label: 'Id',
      required: true
    },
    {
      key: 'name',
      type: 'string',
      isId: false,
      label: 'Country',
      required: true
    },
    {
      key: 'epiIndex',
      type: 'number',
      isId: false,
      label: 'EPI Index',
      required: true
    }
  ];

  constructor(private route: ActivatedRoute,
              private router: Router, private dataService: AppDataService
              ) { }

  ngOnInit() {
    this.operation = this.route.snapshot.params['operation'];

    if (this.operation === 'create'){
      this.country = { id: 0, name: "", epiIndex: null};
    }
    this.dataService.getCountryById(this.route.snapshot.params['id'])
      .subscribe((country: Country) => this.country = country);
  }

  createCountry(country: Country) {
    country.id = 0;
    this.errorMessage = null;
    this.dataService.createCountry(country).subscribe(
      c => this.router.navigate(['/authenticated/country-maint']),
      err => this.errorMessage = "Error creating country."
    );
  }

  updateCountry(country: Country) {
    this.errorMessage = null;
    this.dataService.updateCountry(country).subscribe(
      c => this.router.navigate(['/authenticated/country-maint']),
      err => this.errorMessage = "Error updating country."
    );
  }

}
