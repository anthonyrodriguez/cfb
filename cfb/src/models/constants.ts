import { Season } from './season';

export abstract class Constants {

    // Seasons that we want to see on the site
    static readonly VALID_SEASONS: Season[] = [
        { year: 2019, maxWeek: 15, postseason: true },
        { year: 2018, maxWeek: 15, postseason: true },
        { year: 2017, maxWeek: 15, postseason: true },
    ];
}