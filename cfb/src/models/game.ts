export class Game {
    id: number;
    season: number;
    week: number;
    seasonType: 'regular' | 'postseason';
    homeTeam: string;
    homeConference: string;
    homePoints: number;
    awayTeam: string;
    awayConference: string;
    awayPoints: number;

    constructor(json: any) {
        this.id = json.id;
        this.season = json.season;
        this.week = json.week;
        this.seasonType = json.season_type;
        this.homeTeam = json.home_team;
        this.homeConference = json.home_conference;
        this.homePoints = json.home_points;
        this.awayTeam = json.away_team;
        this.awayConference = json.away_conference;
        this.awayPoints = json.away_points;
    }
}