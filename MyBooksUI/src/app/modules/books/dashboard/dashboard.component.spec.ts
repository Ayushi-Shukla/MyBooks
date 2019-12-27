import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { FavouriteService } from '../favourite.service';
import { AuthenticationService } from '../../authentication/authentication.service';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      imports :[
        RouterTestingModule,
        HttpClientModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,MatSnackBarModule,MatDialogModule, 
        MatDialogModule, MatInputModule,FormsModule,
         MatFormFieldModule,MatIconModule
      ],
      providers : [
        FavouriteService,
        AuthenticationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
