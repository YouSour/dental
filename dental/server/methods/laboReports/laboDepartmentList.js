Meteor.methods({
  dental_laboDepartmentList: function(params) {

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

    var branch,status;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });
    var exchangeDoc = Cpanel.Collection.Exchange.findOne({
      _id: self.exchange
    });

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName;
    } else {
      branch = "All";
    }

    if (self.status != "") {
      status = self.status;
    } else {
      status = "All";
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Status: ' + '</b>' + status,
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
    if (fromDate != null && toDate != null) selector.salesOrderDate = {
      $gte: fromDate,
      $lte: toDate
    };
    if (self.branchId != "") selector.branchId = self.branchId;
    if (self.exchange != "") selectorExchange._id = self.exchange;

    if (self.status == "Active") selector['status.activeDate']  = {
         $exists: true
    }

    if (self.status == "Ready") selector['status.readyDate']  = {
         $exists: true
    }

    if (self.status == "Check-Out") selector['status.checkOutDate']  = {
         $exists: true
    }

    // Get register
    var getSalesOrder = Dental.Collection.LaboSalesOrder.find(selector);
    //Get Exchange
    var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

    var index = 1;
    //Grand Total USD
    var grandTotalUsd = 0;
    //Grand Total KHR
    var grandTotalKhr = 0;
    //Grand Total THB
    var grandTotalThb = 0;

    if (!_.isUndefined(getSalesOrder)) {
      getSalesOrder.forEach(function(obj) {
        obj.index = index;
        obj.customer = obj._customer.name + " (" + obj._customer.gender +
          ")";

        var department = '';
        var totalPriceDepartment = 0 ;
        var departmentExpense = 0 ;
        obj.salesOrderDetail.forEach(function (i) {
          var itemDoc = Dental.Collection.LaboItem.findOne({_id : i.itemId});

          itemDoc.departmentMap.forEach(function (d) {
            departmentExpense = (obj.total * d.price) / 100;
            department += '<tr>' +
              '<td>' + Dental.Collection.LaboDepartment.findOne(d.department)
              .name + '</td>' +

              '<td>' + d.price + '</td>' +
              '<td>' + numeral(departmentExpense).format('0,0.00') + '</td>' +
              '</tr>';

              totalPriceDepartment += departmentExpense;
          });

        });

        obj.departments = department;
        obj.totalFm = numeral(obj.total).format('0,0.00');
        obj.departmentExpense = numeral(totalPriceDepartment).format('0,0.00');


        //Grand Total USD
        grandTotalUsd += totalPriceDepartment * exchange.rates.USD;

        //Grand Total KHR
        grandTotalKhr += Math.round(totalPriceDepartment * exchange.rates.KHR);

        //Grand Total THB
        grandTotalThb += Math.round(totalPriceDepartment * exchange.rates.THB);

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
