Meteor.methods({
  dental_laboSalesOrderCheckOutList: function(params) {

    var self = params;
    var data = {
      title: {},
      header: [],
      content: [],
      footer: [],
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

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName;
    } else {
      branch = "All";
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch
    }];

    /********** Content & Footer **********/
    var content = [];

    var selector = {};
    var date = self.date.split(" To ");
    var fromDate = moment(date[0] + " 00:00:00").format(
      "YYYY-MM-DD HH:mm:ss");
    var toDate = moment(date[1] + " 23:59:59").format(
      "YYYY-MM-DD HH:mm:ss");

      if (fromDate != null && toDate != null && self.status == "Ready") selector['status.readyDate'] = {
        $gte: fromDate,
        $lte: toDate
      };

    if (fromDate != null && toDate != null && self.status == "Check-Out") selector['status.checkOutDate'] = {
      $gte: fromDate,
      $lte: toDate
    };

    if (self.branchId != "") selector.branchId = self.branchId;
    // Get Sales Order
    var getSalesOrder = Dental.Collection.LaboSalesOrder.find(selector);

    var index = 1;

    if (!_.isUndefined(getSalesOrder)) {
      getSalesOrder.forEach(function(obj) {
        obj.index = index;
        obj.customer = obj._customer.name + " (" + obj._customer.gender +
          ")";

        if (!_.isUndefined(obj._customer.telephone)) {
          obj.telephone = obj._customer.telephone;
        } else {
          obj.telephone = "None";
        }

        content.push(obj);

        index += 1;
      });
    }

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
