'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('PhoneCat App', function() {

  it('should redirect index.html to index.html#/phones', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
      expect(url.split("#")[1]).toBe('/phones');
    });
  });  


  describe('Phone List View', function() {

    beforeEach(function() {
      browser.get('app/index.html#/phones');
    });

    var phoneList = element.all(by.repeater('phone in phones')),
        query     = element(by.model('query'));



    it('should filter the phone list as a user types into the search box', function() {
      expect(phoneList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(phoneList.count()).toBe(1);

      query.clear();
      query.sendKeys('yadda');
      expect(phoneList.count()).toBe(0);

    });


    it('should be possible to control phone order via the drop down select box', function() {
      var phoneNameColumn = element.all(by.repeater('phone in phones').column('phone.name'));

      function getNames() {
        return phoneNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ])
    });




    it('should render phone-specific links', function() {
      query.sendKeys("nexus");
      element.all(by.css('.phones li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/phones/nexus-s');
      });
    });
  });

  describe('Phone Detail View', function() {
    beforeEach(function() {
      browser.get('app/index.html#/phones/nexus-s');
    });


    it("should display placeholder page with phoneId", function() {
      expect(element(by.binding('phoneId')).getText()).toBe('nexus-s');
    });
  }); 

});
