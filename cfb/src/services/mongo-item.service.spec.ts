import { TestBed } from '@angular/core/testing';

import { MongoItemService } from './mongo-item.service';

describe('MongoItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MongoItemService = TestBed.get(MongoItemService);
    expect(service).toBeTruthy();
  });
});
