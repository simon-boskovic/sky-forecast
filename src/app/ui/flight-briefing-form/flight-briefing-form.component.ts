import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppFacade } from '@app-state';
import { IFormData } from '@ui-shared-models';
import { Observable, map } from 'rxjs';

function extractWords(input: string): RegExpMatchArray | [] {
  const regex = /[A-Za-z0-9]+/g;
  const words = input.match(regex);
  return words || [];
}

@Component({
  standalone: true,
  selector: 'flight-briefing-form',
  templateUrl: './flight-briefing-form.component.html',
  styleUrls: ['./flight-briefing-form.component.scss'],
  imports: [
    MatButtonModule,
    MatGridListModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlightBriefingFormComponent {
  @Input() isLoading: boolean;
  private _appFacade = inject(AppFacade);
  flightBriefingForm = new FormGroup({
    messageTypes: new FormGroup({
      METAR: new FormControl(true),
      SIGMET: new FormControl(false),
      TAF_LONGTAF: new FormControl(false),
    }),
    airports: new FormControl<string>(''),
    countries: new FormControl<string>(''),
  });
  isFormValid$: Observable<boolean> = this.flightBriefingForm.valueChanges.pipe(
    map(() => {
      const atLeastOneMessageTypeSelected = Object.values(
        this.flightBriefingForm.controls.messageTypes.value
      ).some((res) => !!res);

      const { airports, countries } = this.flightBriefingForm.value;

      const isAirportOrCountryFilled =
        !!airports.trim().length || !!countries.trim().length;

      return (
        this.flightBriefingForm.valid &&
        atLeastOneMessageTypeSelected &&
        isAirportOrCountryFilled
      );
    })
  );

  onSubmit() {
    let { airports, countries, messageTypes } = this.flightBriefingForm.value;

    const transformedMessageTypes = Object.keys(messageTypes).filter(
      (key) => !!messageTypes[key]
    );

    const formData: IFormData = {
      reportTypes: transformedMessageTypes,
      countries: extractWords(countries),
      stations: extractWords(airports),
    };
    this._appFacade.submitData(formData);
  }
}
