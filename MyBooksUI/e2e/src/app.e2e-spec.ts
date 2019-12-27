import { AppPage } from './app.po';
import { browser, by, element,protractor } from 'protractor';

describe('MyBooks App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display title', () => {
    page.navigateTo();
    expect(browser.getTitle()).toEqual('MyBooks');
  });

  
  it('should be redirected to /login on opening the application', () => {
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be redirected to /register page', () => {
    browser.element(by.id('register-button')).click()
    expect(browser.getCurrentUrl()).toContain('/register');
  });

  it('should be able to register user', () => {
    browser.element(by.id('firstName')).sendKeys('Super user');
    browser.element(by.id('lastName')).sendKeys('Super lastUser');
    browser.element(by.id('userId')).sendKeys('Super User12');
    browser.element(by.id('password')).sendKeys('Super Userpass');
    browser.element(by.id('register-user')).click();
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain('/login');
  });

  it('should be able to login user and navigate to dashboard', () => {
    browser.element(by.id('userId')).sendKeys('Super User12');
    browser.element(by.id('password')).sendKeys('Super Userpass');
    browser.element(by.id('login-user')).click();
    expect(browser.getCurrentUrl()).toContain('/dashboard');
  });

  it('should navigate to search component', () => {
    browser.findElement(by.css('#menu')).click();
    browser.sleep(8000);
    var dropDown=element(by.css("#dropdownmenu"));
    var searchLink=element(by.id('searchbtn')).click();
    expect(browser.getCurrentUrl()).toContain('/search');
  });

  it('should be able to search and get cards', () => {
    expect(browser.getCurrentUrl()).toContain('/search');
    browser.element.all(by.id('selected')).click();
    browser.element.all(by.id('author')).click();
    browser.element(by.id('search-button-input')).sendKeys('rowling');
    browser.element(by.id('search-button-input')).sendKeys(protractor.Key.ENTER);
    const searchItems=element.all(by.id('book-title'));
    browser.sleep(5000);
    expect(searchItems.count()).toBe(0);
  //   for(let i=0;i<1;i+=1){
  //     expect(searchItems.get(1).getText()).toContain('Superman');
  //  }
  });


  it('should navigate to favourite list component', () => {
    browser.findElement(by.css('#menu')).click();
    browser.sleep(8000);
    var dropDown=element(by.css("#dropdownmenu"));
    var searchLink=element(by.id('favourite')).click();
    expect(browser.getCurrentUrl()).toContain('/favourite');
  });


  it('should navigate back to homepage', () => {
    browser.element(by.id('homepage')).click();
    expect(browser.getCurrentUrl()).toContain('/dashboard');
  });


  // it('should be able to add books to favourite list', () => {
  //   browser.element(by.id('searchbtn')).click();
  //   browser.driver.manage().window().maximize();
  //   browser.driver.sleep(5000);
  //   const searchItems=element.all(by.id('movie-thumbnail'));
  //   searchItems.get(0).click();
  //   browser.element(by.id('addButton')).click();
  //   browser.driver.sleep(5000);
  // });

  

  it('should logout', () => {
    browser.element(by.id('logout')).click();
    expect(browser.getCurrentUrl()).toContain('/login');
  });
});
