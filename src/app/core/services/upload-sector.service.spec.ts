import { TestBed } from '@angular/core/testing';

import { UploadSectorService } from './upload-sector.service';

describe('UploadSectorService', () => {
  let service: UploadSectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadSectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
