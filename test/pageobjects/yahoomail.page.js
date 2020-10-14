
import Page from './page';
//var page = require('./page.js');

class YahooMail extends Page  {

  get username()   { return $('#login-username'); }
  get nextButton()  { return $('#login-signin'); }
  get resultsList()   { return $('#results'); }
  get errorText()	{ return $('#username-error'); } 	


  open () {
      super.open('https://login.yahoo.com');      
	browser.pause(1000);
  }

  enterUsername (item) {
    this.username.clearValue();
    this.username.setValue(item);
    browser.pause(1000);
  }

  clickNextBtn () {
    this.nextButton.click();
  }
  isSearched () {
    this.resultsList.waitForDisplayed(1000);
    return this.resultsList.isDisplayed();
  }

  isErrorDisplayed() {
	  this.errorText.waitForDisplayed(1000);
	  return this.errorText.isDisplayed();
	}

  getErrorText() {
    return this.errorText.getText();
  }

   	
}

export default new YahooMail();
