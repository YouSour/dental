Meteor.methods({
  dental_laboSalesOrder: function(params) {
    var self = params;
    var data = {
      title: {},
      header: {},
      content: [],
      deposit: [],
      footer: {}
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company
    };

    /********* Header ********/
    var registerDoc = Dental.Collection.LaboSalesOrder.findOne(self.saleOrder);
    var exchange = Cpanel.Collection.Exchange.findOne({
      dateTime: {
        $lte: moment().format("YYYY-MM-DD HH:mm:ss")
      }
    }, {
      sort: {
        dateTime: -1
      }
    });

    data.header = registerDoc;
    data.header.exchange = numeral(exchange.rates.USD).format('$ 0,0.00') +
      " | " + numeral(exchange.rates.KHR).format('0,0.00') + " R" + " | " +
      numeral(exchange.rates.THB).format('0,0.00') + " B";
    /********** Content & Footer **********/
    var content = [];

    // Get deposit
    // var indexOfDeposit = 1;
    // Dental.Collection.Deposit.find({
    //     registerId: self.register
    //   })
    //   .forEach(function(obj) {
    //     obj.index = indexOfDeposit;
    //     obj.price = numeral(obj.price).format('$0,0.00');
    //     obj.amount = numeral(obj.amount).format('$0,0.00');
    //
    //     data.deposit.push(obj);
    //
    //     indexOfDeposit += 1;
    //   });

    // Get invoice
    var getRegister = Dental.Collection.LaboSalesOrder.findOne({
      _id: self.saleOrder
    });
    var index = 1;
    if (!_.isUndefined(getRegister)) {
      // Content

      _.each(getRegister.salesOrderDetail, function(obj) {
        var itemDoc = Dental.Collection.LaboItem.findOne(obj.itemId);
        obj.index = index;
        obj.itemName = itemDoc.name;
        obj.price = numeral(obj.price).format('$0,0.00');
        obj.discount = obj.discount + "%";
        obj.amount = numeral(obj.amount).format('$0,0.00');
        content.push(obj);

        index += 1;
      });
      data.content = content;

      // Footer
      var footer = {};
      var totalPaidAmount = 0;
      var totalTemp = 0;
      Dental.Collection.LaboSalesOrderPayment.find({
        saleOrderId: self.saleOrder
      }).forEach(function(objPayment) {
        totalPaidAmount += objPayment.paidAmount;
      });

      // totalTemp = (getRegister.total - totalPaidAmount) - getRegister.deposit;
      totalTemp = getRegister.total - totalPaidAmount;

      footer.subTotal = numeral(getRegister.subTotal).format('$0,0.00');
      // footer.deposit = numeral(getRegister.deposit).format('$0,0.00');
      footer.subDiscount = numeral(getRegister.subDiscount).format(
        '$0,0.00');
      footer.paidAmount = numeral(totalPaidAmount).format('$0,0.00');
      footer.total = numeral(totalTemp).format('$0,0.00');
      footer.totalKhr = "R" + numeral(totalTemp * exchange.rates.KHR).format('0,0.00');
      footer.totalThb = "THB" + numeral(totalTemp * exchange.rates.THB).format('0,0.00');
      data.footer = footer;

      return data;
    } else {
      data.content.push({
        index: 'no results'
      });
      return data;
    }
  }
});
