import { Component, OnInit } from '@angular/core';
import { MongoItemService } from 'src/services/mongo-item.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    mongoItem: string;

    constructor(private mongoItemService: MongoItemService) {}

    ngOnInit() {
        this.mongoItem = this.mongoItemService.getItem();
    }
}
