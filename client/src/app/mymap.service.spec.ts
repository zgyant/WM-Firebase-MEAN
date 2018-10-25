import { TestBed } from '@angular/core/testing';

import { MymapService } from './mymap.service';

describe('MymapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MymapService = TestBed.get(MymapService);
    expect(service).toBeTruthy();
  });
});
