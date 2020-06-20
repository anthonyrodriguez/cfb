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
    spread: string;

    constructor(json: any) {
        this.id = json.id;
        this.season = json.season;
        this.week = json.week;
        this.seasonType = json.seasonType;
        this.homeTeam = json.homeTeam;
        this.homeConference = json.homeConference;
        this.homePoints = json.homeScore;
        this.awayTeam = json.awayTeam;
        this.awayConference = json.awayConference;
        this.awayPoints = json.awayScore;
        this.spread = null;
        // Attempt to get the 'consensus' line, otherwise default to first available
        if (json.lines) {
            const consensusLine = json.lines.filter(line => line.provider === 'consensus');
            if (consensusLine.length !== 0) {
                this.spread = consensusLine[0].spread || null;
            } else {
                this.spread = json.lines[0] ? json.lines[0].spread : null;
            }
        }
    }
}
