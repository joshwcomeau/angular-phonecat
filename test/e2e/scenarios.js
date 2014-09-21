'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

  describe('Phone List View', function() {

    beforeEach(function() {
      browser.get('app/index.html');
    });

    var phoneList = element.all(by.repeater('phone in phones')),
        query     = element(by.model('query'));


    it('should filter the phone list as a user types into the search box', function() {
      expect(phoneList.count()).toBe(4);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('yadda');
      expect(phoneList.count()).toBe(1);

    });

    it('should display the current query in the title', function() {
      query.clear();
      expect(browser.getTitle()).toMatch(/Google Phone Gallery:\s*$/);

      query.sendKeys("Nexus");
      expect(browser.getTitle()).toMatch(/Google Phone Gallery: Nexus$/);
    });

    it('should be possible to control phone order via the drop down select box', function() {

      var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));
      var query = element(by.model('query'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('iphone'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        'Apple iPhone 6', 
        'Apple iPhone 5S'
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        'Apple iPhone 5S',
        'Apple iPhone 6'
      ])
    });

  });

});
