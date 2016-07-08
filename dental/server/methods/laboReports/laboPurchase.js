Meteor.methods({
  dental_laboPurchase: function(params) {
    var self = params;
    var data = {
      title: {},
      header: {},
      content: [],
      footer: {}
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company
    };

    /********* Header ********/
    var purchaseDoc = Dental.Collection.LaboPurchase.findOne({
      _id: self.purchase
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
    data.header = purchaseDoc;
    data.header.exchange = numeral(exchange.rates.USD).format('$ 0,0.00') +
      " | " + numeral(exchange.rates.KHR).format('0,0.00') + " R" + " | " +
      numeral(exchange.rates.THB).format('0,0.00') + " B";

    /********** Content & Footer **********/
    var content = [];

    // Each item
    var index = 1;
    _.each(purchaseDoc.purchaseDetail, function(obj) {
      var materialDoc = Dental.Collection.LaboMaterial.findOne(obj.materialId);
      obj.index = index;
      obj.itemName = materialDoc.name;
      obj.price = numeral(obj.price).format('$0,0.00');
      obj.amount = numeral(obj.amount).format('$0,0.00');

      content.push(obj);

      index += 1;
    });

    data.footer.total = numeral(purchaseDoc.total).format('$0,0.00');
    data.footer.totalKhr = "R" + numeral(purchaseDoc.total * exchange.rates
      .KHR).format('0,0.00');
    data.footer.totalThb = "THB" + numeral(purchaseDoc.total * exchange.rates
      .THB).format('0,0.00');

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
