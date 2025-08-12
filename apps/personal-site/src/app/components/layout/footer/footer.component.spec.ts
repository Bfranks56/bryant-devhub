import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the copyright', () => {
    const text = fixture.debugElement.nativeElement.textContent.toLowerCase();
    expect(text).toContain('bryant franks');
  });

  it('should show the links', () => {
    const github = fixture.debugElement.query(
      By.css('a[href^="https://github.com"]')
    );
    const linkedin = fixture.debugElement.query(
      By.css('a[href^="https://www.linkedin.com"]')
    );
    const contact = fixture.debugElement.query(
      By.css('a[routerLink="/contact"]')
    );

    expect(github).toBeTruthy();
    expect(linkedin).toBeTruthy();
    expect(contact).toBeTruthy();
  });
});
