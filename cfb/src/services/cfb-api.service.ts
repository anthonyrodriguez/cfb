import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CfbApiService {

    baseUrl = 'https://api.collegefootballdata.com';

    constructor(private http: HttpClient) { }

    getGames(id: number, season: number, week: number, postseason: boolean): Observable<JSON> {
        // postseason flag overrides the week
        // id overrides everything
        const queryParams = id ? { params: new HttpParams().set('id', String(id)) } :
                            (postseason ? { params: new HttpParams().set('year', String(season)).set('seasonType', 'postseason') } :
                                          { params: new HttpParams().set('year', String(season)).set('week', String(week)) });
        return this.http.get<JSON>(this.baseUrl, queryParams);
    }
}
