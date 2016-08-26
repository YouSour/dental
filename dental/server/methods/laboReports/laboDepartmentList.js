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

    var branch, status;

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
    var selectorDepartment = {};
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
    if (self.department != "") selectorDepartment._id = self.department;

    if (self.status == "Active") selector['status.activeDate'] = {
      $exists: true
    }

    if (self.status == "Ready") selector['status.readyDate'] = {
      $exists: true
    }

    if (self.status == "Check-Out") selector['status.checkOutDate'] = {
      $exists: true
    }

    // Get register
    var getSalesOrder = Dental.Collection.LaboSalesOrder.find(selector);
    //Get Exchange
    var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

    //Grand Total USD
    var grandTotalUsd = 0;
    //Grand Total KHR
    var grandTotalKhr = 0;
    //Grand Total THB
    var grandTotalThb = 0;

    Dental.Collection.LaboDepartment.find(selectorDepartment).forEach(function(depObj) {
      var totalShare = 0;
      var index = 1;
      var invoices = [];
      if (!_.isUndefined(getSalesOrder)) {
        getSalesOrder.forEach(function(soObj) {

          var departmentExpense = 0;

          var itemList = [];
          var totalDepartmentFee = 0;
          soObj.salesOrderDetail.forEach(function(sdObj) {
            var itemDoc = Dental.Collection.LaboItem.findOne({
              _id: sdObj.itemId
            });


            soObj.departmentMap.forEach(function(d) {

              if (depObj._id == d.department) {
                itemList.push({
                  itemId: itemDoc._id,
                  itemName: itemDoc.name,
                  amount: sdObj.amount,
                  departmentFee: sdObj.amount * (d.price / 100),
                });
                totalDepartmentFee += (sdObj.amount * (d.price / 100));
                totalShare += (sdObj.amount * (d.price / 100));

              }

            });
          });

          if (totalDepartmentFee > 0) {

            invoices.push({
              invoice: soObj._id,
              invoiceDate: soObj.salesOrderDate,
              customer: soObj._customer.name,
              total: soObj.total,
              items: itemList,
              totalDepartmentFee: numeral(totalDepartmentFee).format('0,0.00'),
              index: index
            });
            index+=1;
          }

          grandTotalUsd += totalDepartmentFee;
          grandTotalKhr = Math.round(grandTotalUsd * exchange.rates.KHR);
          grandTotalThb = Math.round(grandTotalUsd * exchange.rates.THB);
        });
      }

      content.push({
        departmentIdName: depObj._id + " : " + depObj.name,
        departmentName: depObj.name,
        invoices: invoices,
        totalShareUsd : numeral(totalShare).format('0,0.00')
      });

    }); // end Loop department

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
