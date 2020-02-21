import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class ValidWeeksService {

    weeks: number[][];

    constructor() { }

    getItem(): string {
        return 'Test Mongo Item';
    }
}
