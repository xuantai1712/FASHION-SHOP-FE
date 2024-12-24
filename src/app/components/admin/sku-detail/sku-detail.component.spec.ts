import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkuDetailComponent } from './sku-detail.component';

describe('SkuDetailComponent', () => {
  let component: SkuDetailComponent;
  let fixture: ComponentFixture<SkuDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkuDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkuDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
