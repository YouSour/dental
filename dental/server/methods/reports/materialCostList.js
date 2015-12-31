Meteor.methods({
  dental_materialCostList: function(params) {
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

    var doctor, branch;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });
    var doctorDoc = Dental.Collection.Doctor.findOne({
      _id: self.doctorId
    });
    var exchangeDoc = Cpanel.Collection.Exchange.findOne({
      _id: self.exchange
    });

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName
    } else {
      branch = "All";
    }
    if (self.doctorId != "") {
      doctor = self.doctorId + " | " + doctorDoc.name;
    } else {
      doctor = 'All';
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Doctor: ' + '</b>' + doctor,
      col3: '<b>' + 'Exchange: ' + '</b>' + numeral(exchangeDoc.rates
        .USD).format('$ 0,0.00') + " | " + numeral(exchangeDoc.rates
        .KHR).format('0,0.00') + " R" + " | " + numeral(exchangeDoc
        .rates.THB).format('0,0.00') + " B"
    }];

    /********** Content & Footer **********/
    var content = [];

    var selector = {};
    var selectorExchange = {};

    var date = self.date.split(" To ");
    var fromDate = moment(date[0] + " 00:00:00").format(
      "YYYY-MM-DD HH:mm:ss");
    var toDate = moment(date[1] + " 23:59:59").format(
      "YYYY-MM-DD HH:mm:ss");
    if (fromDate != null && toDate != null) selector.materialCostDate = {
      $gte: fromDate,
      $lte: toDate
    };

    if (self.doctorId != "") selector.doctorId = self.doctorId;
    if (self.branchId != "") selector.branchId = self.branchId;
    if (self.exchange != "") selectorExchange._id = self.exchange;
    // Get MaterialCost
    var getMaterialCost = Dental.Collection.MaterialCost.find(selector);
    //Get Exchange
    var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

    var index = 1;

    //Grand Total USD
    var grandTotalUsd = 0;
    //Grand Total KHR
    var grandTotalKhr = 0;
    //Grand Total THB
    var grandTotalThb = 0;

    if (!_.isUndefined(getMaterialCost)) {
      getMaterialCost.forEach(function(obj) {

        obj.index = index;
        obj.doctor = obj._doctor.name + " (" + obj._doctor.gender +
          ")";
        var item = '';
        obj.items.forEach(function(i) {
          item += '<tr>' +
            '<td>' + Dental.Collection.MaterialCostItem.findOne(i
              .materialCostItemId).name + '</td>' +
            '<td>' + i.qty + '</td>' +
            '<td>' + i.price + '</td>' +
            '<td>' + i.amount + '</td>' +
            '</tr>';
        });
        obj.items = item;

        obj.total = numeral(obj.total).format('0,0.00');

        content.push(obj);

        index += 1;

        //Grand Total USD
        grandTotalUsd += Math.round(obj.total * exchange.rates.USD);

        //Grand Total KHR
        grandTotalKhr += Math.round(obj.total * exchange.rates.KHR);

        //Grand Total THB
        grandTotalThb += Math.round(obj.total * exchange.rates.THB);
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
