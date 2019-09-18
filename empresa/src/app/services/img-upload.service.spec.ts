import { TestBed } from '@angular/core/testing';

import { ImgUploadService } from './img-upload.service';

describe('ImgUploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImgUploadService = TestBed.get(ImgUploadService);
    expect(service).toBeTruthy();
  });
});
