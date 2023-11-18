import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MysqlComponent } from './mysql.component';

describe('MysqlComponent', () => {
  let component: MysqlComponent;
  let fixture: ComponentFixture<MysqlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MysqlComponent]
    });
    fixture = TestBed.createComponent(MysqlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
