import { Component, OnChanges, OnInit } from '@angular/core';
import { MongoItemService } from 'src/services/mongo-item.service';
import { Season } from 'src/models/season';
import { Constants } from 'src/models/constants';
import { CfbApiService } from 'src/services/cfb-api.service';
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
    loading: boolean;

    // valid conferences
    accGames: Game[] = [];
    big12Games: Game[] = [];
    bigTenGames: Game[] = [];
    pac12Games: Game[] = [];
    secGames: Game[] = [];
    g5Games: Game[] = [];

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
        this.updateGameList();
    }

    private updateConferenceLists() {
        this.accGames = [];
        this.big12Games = [];
        this.bigTenGames = [];
        this.pac12Games = [];
        this.secGames = [];
        this.g5Games = [];
        this.gamesResponse.forEach((game) => {
            switch (game.homeConference) {
                case 'ACC':
                    this.accGames.push(game);
                    break;
                case 'Big 12':
                    this.big12Games.push(game);
                    break;
                case 'Big Ten':
                    this.bigTenGames.push(game);
                    break;
                case 'Pac-12':
                    this.pac12Games.push(game);
                    break;
                case 'SEC':
                    this.secGames.push(game);
                    break;
                default:
                    switch (game.awayConference) {
                        case 'ACC':
                            this.accGames.push(game);
                            break;
                        case 'Big 12':
                            this.big12Games.push(game);
                            break;
                        case 'Big Ten':
                            this.bigTenGames.push(game);
                            break;
                        case 'Pac-12':
                            this.pac12Games.push(game);
                            break;
                        case 'SEC':
                            this.secGames.push(game);
                            break;
                        default:
                            this.g5Games.push(game);
                            break;
                    }
                    break;
            }
        });
    }

    private updateGameList() {
        this.cfbApiService.getGames(null, this.selectedSeason.year, this.selectedWeekIndex, (this.selectedWeekIndex === -1))
            .subscribe(
                (res: Game[]) => {
                    this.gamesResponse = res;
                },
                err => {
                    this.loading = false;
                    this.gamesResponse = [];
                    this.updateConferenceLists();
                },
                () => {
                    this.loading = false;
                    this.updateConferenceLists();
                }
            );
    }

    onYearChange(event: any) {
        this.selectedWeekIndex = this.selectedSeason.maxWeek - 1;
        this.validWeeks = Array(this.selectedWeekIndex + 1).fill(0).map((x, i) => String(i + 1));
        if (this.selectedSeason.postseason) {
            this.selectedWeekIndex = -1;
        }
        this.updateGameList();
    }

    onWeekChange(week: number) {
        this.selectedWeekIndex = week;
        this.updateGameList();
    }
}
