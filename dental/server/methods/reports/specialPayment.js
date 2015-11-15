Meteor.methods({
  dental_specialPayment: function(params) {
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
    var registerDoc = Dental.Collection.SpecialPayment.findOne({
      specialRegisterId: self.specialRegister
    });
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

    // Special Register
    var registerDoc = Dental.Collection.SpecialRegister.findOne({
      _id: self.specialRegister
    });

    var index = 1;
    if (registerDoc) {
      // Content
      _.each(registerDoc.disease, function(obj) {
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
      if (registerDoc) {
        registerDoc.paymentMethod.forEach(function(object) {
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


      return data;
    } else {
      data.content.push({
        index: 'no results'
      });
      return data;
    }
  }
});
