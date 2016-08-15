Meteor.methods({
  dental_osLaboMaterialStockList: function(params) {

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

    var branch;

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

    data.header = [{
      col1: '<b>' + 'Branch: ' + '</b>' + branch,
      col2: '<b>' + 'Exchange: ' + '</b>' + numeral(exchangeDoc.rates
        .USD).format('$ 0,0.00') + " | " + numeral(exchangeDoc.rates
        .KHR).format('0,0.00') + " R" + " | " + numeral(exchangeDoc
        .rates.THB).format('0,0.00') + " B"
    }];

    /********** Content & Footer **********/
    var content = [];
    var selector = {};
    var selectorExchange = {};
    var dateVal = self.date + ' 23:59:59';

    if (self.branchId != "") selector.branchId = self.branchId;
    if (self.material != "") selector._id = self.material;
    if (self.category != "") selector.materialCategoryId = self.category;
    if (self.exchange != "") selectorExchange._id = self.exchange;

    //Get Exchange
    var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

    // Get Material
    var getMaterial = Dental.Collection.LaboMaterial.find(selector,{sort:{_id:1}});

    var index = 1;
    var grandTotalAmount = 0;
    var grandTotalAmountKhr = 0;
    var grandTotalAmountThb = 0;

    if (!_.isUndefined(getMaterial)) {
      getMaterial.forEach(function(obj) {
        var getAvgStockDoc = Dental.Collection.LaboAverageStock.findOne({materialId:obj._id,stockDate: { $lte: dateVal}},{sort:{_id:-1}});

          obj.index = index;
          if(!_.isUndefined(getAvgStockDoc)){
              obj.balanceQty = getAvgStockDoc.closedQtyBalance;
              obj.avgPriceFm = numeral(getAvgStockDoc.avgPrice).format('0,0.00');
              obj.balanceQty = getAvgStockDoc.closedQtyBalance;
              obj.amount = numeral(getAvgStockDoc.closedQtyBalance * getAvgStockDoc.avgPrice).format('0,0.00');

              grandTotalAmount += (getAvgStockDoc.closedQtyBalance * getAvgStockDoc.avgPrice) * exchange.rates.USD;
              grandTotalAmountKhr = Math.round(grandTotalAmount * exchange.rates.KHR);
              grandTotalAmountThb = Math.round(grandTotalAmount * exchange.rates.THB);
              
          }else{
              obj.balanceQty = 0;
              obj.avgPriceFm = "None";
              obj.amount = numeral(0).format('0,0.00');
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

    data.footer.grandTotalAmountUsd = numeral(grandTotalAmount).format('0,0.00');
    data.footer.grandTotalAmountKhr = numeral(grandTotalAmountKhr).format('0,0.00');
    data.footer.grandTotalAmountThb = numeral(grandTotalAmountThb).format('0,0.00');

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
