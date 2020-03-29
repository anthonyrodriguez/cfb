import { Component, OnInit } from '@angular/core';
import { MongoItemService } from 'src/services/mongo-item.service';
import { Season } from 'src/models/season';
import { Constants } from 'src/models/constants';
import { CfbApiService } from 'src/services/cfb-api.service';
import { take } from 'rxjs/operators';
import { Game } from 'src/models/game';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    validSeasons: Season[];
    validWeeks: string[];

    selectedSeason: Season;
    selectedWeekIndex: number;

    gamesResponse: Game[];

    constructor(private mongoItemService: MongoItemService,
                private cfbApiService: CfbApiService) {

    }

    ngOnInit() {
        this.validSeasons = Constants.VALID_SEASONS;
        this.selectedSeason = this.validSeasons[0];
        this.selectedWeekIndex = this.validSeasons[0].maxWeek - 1 ;
        this.validWeeks = Array(this.selectedWeekIndex + 1).fill(0).map((x, i) => String(i + 1));
        if (this.selectedSeason.postseason) {
            this.selectedWeekIndex = -1;
        }
        console.log(this.validWeeks);
        this.cfbApiService.getGames(null, this.selectedSeason.year, this.selectedWeekIndex, (this.selectedWeekIndex === -1))
            .subscribe((games: Game[]) => {
                this.gamesResponse = games;
            });
    }

    protected onYearChange(event: any) {
        this.selectedSeason = event.value as Season;
        this.selectedWeekIndex = this.selectedSeason.maxWeek - 1;
        this.validWeeks = Array(this.selectedWeekIndex + 1).fill(0).map((x, i) => String(i + 1));
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
