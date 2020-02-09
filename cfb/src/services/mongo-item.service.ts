import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MongoItemService {

    mongoItems: string[];

    constructor() { }

    getItem(): string {
        return 'Test Mongo Item';
    }
}
