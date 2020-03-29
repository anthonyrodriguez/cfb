import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Game } from 'src/models/game';

@Injectable({
    providedIn: 'root'
})
export class CfbApiService {

    baseUrl = 'https://api.collegefootballdata.com/games';

    constructor(private http: HttpClient) { }

    getGames(id: number, season: number, week: number, postseason: boolean): Observable<Game[]> {
        // postseason flag overrides the week
        // id overrides everything
        const queryParams = id ? new HttpParams().set('id', String(id)) :
                            (postseason ? new HttpParams().set('year', String(season)).set('seasonType', 'postseason') :
                                          new HttpParams().set('year', String(season)).set('week', String(week)));
        const queryHeaders = new HttpHeaders({
            // 'Access-Control-Allow-Origin': '*'
        });
        return this.http.get(this.baseUrl, { params: queryParams, headers: queryHeaders})
            .pipe(
                retry(2),
                catchError(this.handleError),
                map(res => {
                    const response = res;
                    if (Array.isArray(response)) {
                        return response.map((item) => new Game(item));
                    } else {
                        return [new Game(response)];
                    }
                })
            );
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }
}
