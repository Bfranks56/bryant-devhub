import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render nav links', () => {
    const linkElements = fixture.debugElement.queryAll(
      By.css('nav[aria-label="Main"] a')
    );
    const linkTexts = linkElements.map(el =>
      el.nativeElement.textContent.trim()
    );

    expect(linkTexts).toContain('Home');
    expect(linkTexts).toContain('About');
    expect(linkTexts).toContain('Projects');
    expect(linkTexts).toContain('Contact');
  });

  it('toggles mobile menu when clicking menu button', () => {
    const btn = fixture.debugElement.query(By.css('button[aria-label="Menu"]'));

    expect(
      fixture.debugElement.query(By.css('nav[aria-label="Mobile"]'))
    ).toBeNull();

    btn.triggerEventHandler('click', new MouseEvent('click'));
    fixture.detectChanges();

    expect(
      fixture.debugElement.query(By.css('nav[aria-label="Mobile"]'))
    ).not.toBeNull();
  });
});
