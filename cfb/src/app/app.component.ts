import { Component, OnInit } from '@angular/core';

import { MongoItemService } from 'src/services/mongo-item.service';
import { Season } from 'src/models/season';

const VALID_SEASONS: Season[] = [
    { year: 2019, maxWeek: 15, postseason: true },
    { year: 2018, maxWeek: 15, postseason: false },
    { year: 2017, maxWeek: 10, postseason: true },
    // { year: 2017, maxWeek: 15, postseason: true }
];

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    validSeasons: Season[];
    validWeeks: string[];

    selectedSeason: Season;
    selectedWeekIndex: number;

    constructor(private mongoItemService: MongoItemService) {

    }

    ngOnInit() {
        this.validSeasons = VALID_SEASONS;
        this.selectedSeason = this.validSeasons[0];
        this.selectedWeekIndex = this.validSeasons[0].maxWeek - 1 ;
        this.validWeeks = Array(this.selectedWeekIndex + 1).fill(0).map((x,i) => String(i + 1));
        if (this.selectedSeason.postseason) {
            this.selectedWeekIndex = -1;
        }
        console.log(this.validWeeks);
    }

    protected onYearChange(event: any) {
        this.selectedSeason = event.value as Season;
        this.selectedWeekIndex = this.selectedSeason.maxWeek - 1;
        this.validWeeks = Array(this.selectedWeekIndex + 1).fill(0).map((x,i) => String(i + 1));
        if (this.selectedSeason.postseason) {
            this.selectedWeekIndex = -1;
        }
        console.log(this.validWeeks);
    }

    protected onWeekChange(event: any) {
        console.log(this.validWeeks);
        this.selectedWeekIndex = (event.value as number);
        console.log(this.selectedWeekIndex);
    }
}
