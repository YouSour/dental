Meteor.methods({
  dental_materialCost: function(params) {
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
    var materialCostDoc = Dental.Collection.MaterialCost.findOne({
      _id: self.materialCost
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
    data.header = materialCostDoc;
    data.header.exchange = numeral(exchange.rates.USD).format('$ 0,0.00') +
      " | " + numeral(exchange.rates.KHR).format('0,0.00') + " R" + " | " +
      numeral(exchange.rates.THB).format('0,0.00') + " B";

    /********** Content & Footer **********/
    var content = [];

    // Each item
    var index = 1;
    _.each(materialCostDoc.items, function(obj) {
      var itemDoc = Dental.Collection.MaterialCostItem.findOne(obj.materialCostItemId);
      obj.index = index;
      obj.itemName = itemDoc.name;
      obj.price = numeral(obj.price).format('$0,0.00');
      obj.amount = numeral(obj.amount).format('$0,0.00');

      content.push(obj);

      index += 1;
    });

    data.footer.total = numeral(materialCostDoc.total).format('$0,0.00');
    data.footer.totalKhr = "R" + numeral(materialCostDoc.total * exchange
      .rates.KHR).format('0,0.00');
    data.footer.totalThb = "THB" + numeral(materialCostDoc.total *
      exchange.rates.THB).format('0,0.00');

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
