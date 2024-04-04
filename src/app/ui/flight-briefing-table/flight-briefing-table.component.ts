import { DatePipe, KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { fadeIn } from '@app/shared/animations';
import { HighlightWeatherCodeDirective } from '@app/shared/directives/highlight-weather-code.directive';
import { TOpmetGroupedResponse } from '@app/shared/models';

@Component({
  standalone: true,
  selector: 'flight-briefing-table',
  templateUrl: './flight-briefing-table.component.html',
  styleUrls: ['./flight-briefing-table.component.scss'],
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [KeyValuePipe, DatePipe, HighlightWeatherCodeDirective],
})
export class FlightBriefingTableComponent {
  @Input() data: TOpmetGroupedResponse;
}
