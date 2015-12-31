Meteor.methods({
  dental_osForActiveRegisterReport: function(params) {
    var self = params;
    var data = {
      title: {},
      header: [],
      content: [],
      footer: {},
      deposit: []
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company,
      date: self.date
    };

    /********* Header ********/

    var branch;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });
    var exchange = Cpanel.Collection.Exchange.findOne({
      _id: self.exchange
    });

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName
    } else {
      branch = "All";
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Exchange: ' + '</b>' + numeral(exchange.rates.USD)
        .format('$ 0,0.00') + " | " + numeral(exchange.rates.KHR).format(
          '0,0.00') + " R" + " | " + numeral(exchange.rates.THB).format(
          '0,0.00') + " B"

    }];

    /********** Content & Footer **********/
    var content = [];
    var selector = {};

    var dateVal = self.date + ' 23:59:59';
    selector.registerDate = {
      $lte: dateVal
    };
    selector.$or = [{
      closingDate: {
        $not: {
          $lte: dateVal
        }
      }
    }, {
      closingDate: {
        $eq: ''
      }
    }];
    if (self.branchId != "") {
      selector.branchId = self.branchId;
    }

    // Get invoice
    var getRegister = Dental.Collection.Register.find(selector);

    var index = 1;

    // Sub total
    var grandTotalUsd = 0;
    var grandTotalKhr = 0;
    var grandTotalThb = 0;

    if (!_.isUndefined(getRegister)) {
      getRegister.forEach(function(obj) {

        obj.index = index;
        obj.patientGender = obj._patient.name + " (" + obj._patient.gender +
          ")";
        obj.subTotalFm = numeral(obj.subTotal).format('0,0.00');
        obj.subDiscountFm = numeral(obj.subDiscount).format('0,0.00');
        obj.depositFm = numeral(obj.deposit).format('0,0.00');
        obj.totalFm = numeral(obj.total).format('0,0.00');

        if (!_.isUndefined(obj._patient.age)) {
          obj.age = obj._patient.age;
        } else {
          obj.age = "None";
        }

        if (!_.isUndefined(obj._patient.telephone)) {
          obj.telephone = obj._patient.telephone;
        } else {
          obj.telephone = "None";
        }

        //Grand Total USD
        grandTotalUsd += math.round(obj.total);
        grandTotalKhr += math.round(obj.total * exchange.rates.KHR);
        grandTotalThb += math.round(obj.total * exchange.rates.THB);

        content.push(obj);

        index += 1;
      });
    }

    data.footer.grandTotalUsd = numeral(grandTotalUsd).format('0,0.00');
    data.footer.grandTotalKhr = numeral(grandTotalKhr).format('0,0.00');
    data.footer.grandTotalThb = numeral(grandTotalThb).format('0,0.00');

    if (content.length > 0) {
      data.content = content;

      return data;
    } else {
      data.content.push({
        index: 'no results'
      });
      return data;
    }
  }
});
