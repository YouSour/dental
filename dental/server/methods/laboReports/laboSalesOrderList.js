Meteor.methods({
  dental_laboSalesOrderList: function(params) {

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

    var branch,customer;

    var branchDoc = Cpanel.Collection.Branch.findOne({
      _id: self.branchId
    });

    var customerDoc = Dental.Collection.LaboCustomer.findOne({
      _id: self.customer
    });

    if (self.branchId != "") {
      branch = self.branchId + " | " + branchDoc.enName;
    } else {
      branch = "All";
    }

    if (self.customer != "") {
      customer = self.customer + " | " + customerDoc.name;
    } else {
      customer = "All";
    }

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Customer: ' + '</b>' + customer,
    }];

    /********** Content & Footer **********/
    var content = [];

    var selector = {};
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
    if (self.customer != "") selector.customerId = self.customer;

    // Get register
    var getSalesOrder = Dental.Collection.LaboSalesOrder.find(selector,{sort:{salesOrderDate:1}});

    var index = 1;

    if (!_.isUndefined(getSalesOrder)) {
      getSalesOrder.forEach(function(obj) {
        obj.index = index;
        obj.customer = obj._customer.name + " (" + obj._customer.gender +
          ")";

        if (!_.isUndefined(obj._customer.address)) {
          obj.address = obj._customer.address;
        } else {
          obj.address = "None";
        }

        if (!_.isUndefined(obj._customer.telephone)) {
          obj.telephone = obj._customer.telephone;
        } else {
          obj.telephone = "None";
        }

        if (!_.isUndefined(obj.des)) {
          obj.description = obj.des;
        } else {
          obj.description = "None";
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
