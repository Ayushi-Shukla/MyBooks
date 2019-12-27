import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule, MatCardModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatInputModule, MatFormFieldModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FavouriteService } from './modules/books/favourite.service';
import { AuthenticationService } from './modules/authentication/authentication.service';

xdescribe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule, MatToolbarModule,
        ReactiveFormsModule,
        MatSelectModule,
        FormsModule,
        MatSnackBarModule,MatDialogModule, 
        MatDialogModule, MatInputModule,FormsModule,
         MatFormFieldModule,MatIconModule
      ],
      declarations: [
        AppComponent       
        
      ],
      providers : [
        FavouriteService,
        AuthenticationService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MovieCruiser'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MovieCruiser');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to MovieCruiser!');
  });
});
