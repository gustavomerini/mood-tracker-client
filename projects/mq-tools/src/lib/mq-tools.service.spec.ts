import { TestBed } from '@angular/core/testing';

import { MqToolsService } from './mq-tools.service';

describe('MqToolsService', () => {
  let service: MqToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MqToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
