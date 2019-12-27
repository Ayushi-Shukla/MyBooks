import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteComponent } from './favourite.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FavouriteService } from '../favourite.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MatSelectModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatIconModule } from '@angular/material';

fdescribe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;
  let viewservice: FavouriteService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteComponent ],
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
    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('users favourite List ', () => {
    viewservice = fixture.debugElement.injector.get(FavouriteService);
    const favourite: any = JSON.parse(JSON.stringify({
     book :
       {
         title : 'someone',
         author : 'someone',
         isbn : '3453',
         key : '435354'
       },
    }));
    spyOn(viewservice, "getFavourites").and.returnValue(of(favourite));
    component.ngOnInit();
    expect(viewservice.getFavourites).toHaveBeenCalled();
  });

  it('when user has no favourites ', () => {
    viewservice = fixture.debugElement.injector.get(FavouriteService);
    const favourite: any = JSON.parse(JSON.stringify({
     book :[
     ]
    }));
    spyOn(viewservice, "getFavourites").and.returnValue(of(favourite));
    component.ngOnInit();
    expect(viewservice.getFavourites).toHaveBeenCalled();
  });

});
