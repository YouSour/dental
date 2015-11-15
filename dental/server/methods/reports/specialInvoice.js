Meteor.methods({
  dental_specialInvoice: function(params) {
    var self = params;
    var data = {
      title: {},
      header: {},
      content: [],
      paymentMethod: [],
      footer: {}
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company
    };

    /********* Header ********/
    var registerDoc = Dental.Collection.SpecialRegister.findOne(self.specialRegister);
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

    // Get special invoice
    var getRegister = Dental.Collection.SpecialRegister.findOne({
      _id: self.specialRegister
    });
    var index = 1;
    if (!_.isUndefined(getRegister)) {
      // Content
      _.each(getRegister.disease, function(obj) {
        var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
        obj.index = index;
        obj.itemName = itemDoc.name;
        obj.price = numeral(obj.price).format('$0,0.00');
        obj.discount = obj.discount + "%";
        obj.amount = numeral(obj.amount).format('$0,0.00');

        content.push(obj);

        index += 1;
      });
      data.content = content;

      // Payment method
      if (getRegister) {
        getRegister.paymentMethod.forEach(function(object) {
          // Check with payment
          var getPayment = Dental.Collection.SpecialPayment.findOne({
            specialRegisterId: self.specialRegister,
            paymentMethod: object.index
          });
          if (getPayment) {
            object.paymentDate = getPayment.paymentDate;
            object.paidAmount = numeral(getPayment.paidAmount).format(
              '$0,0.00');
          }

          object.amount = numeral(object.amount).format('$0,0.00');
          data.paymentMethod.push(object);
        });
      }

      // Footer
      var footer = {};
      var totalPaidAmount = 0;
      Dental.Collection.SpecialPayment.find({
        specialRegisterId: self.specialRegister
      }).forEach(function(objPayment) {
        totalPaidAmount += objPayment.paidAmount;
      });
      footer.subTotal = numeral(getRegister.subTotal).format('$0,0.00');
      footer.subDiscount = numeral(getRegister.subDiscount).format(
        '$0,0.00');
      footer.paidAmount = numeral(totalPaidAmount).format('$0,0.00');
      footer.total = numeral(getRegister.total - totalPaidAmount).format(
        '$0,0.00');
      footer.totalKhr = "R" + numeral((getRegister.total -
          totalPaidAmount) * exchange.rates.KHR)
        .format('0,0.00');
      footer.totalThb = "THB" + numeral((getRegister.total -
          totalPaidAmount) * exchange.rates
        .THB).format('0,0.00');
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
