Meteor.methods({
  dental_osLaboMaterialList: function(params) {

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
    if (self.branchId != "") selector.branchId = self.branchId;
    if (self.material != "") selector._id = self.material;

    // Get Material
    var getMaterial = Dental.Collection.LaboMaterial.find(selector,{sort:{_id:1}});

    var index = 1;
    var grandTotalBalanceQty = 0;
    var grandTotalAvgPrice = 0;
    if (!_.isUndefined(getMaterial)) {
      getMaterial.forEach(function(obj) {
        obj.index = index;

        if (!_.isNull(obj.avgPrice)) {
          obj.avgPrice = obj.avgPrice;
          grandTotalAvgPrice += obj.avgPrice;
        } else {
          obj.avgPrice = "None";
        }

        if (!_.isUndefined(obj.des)) {
          obj.description = obj.des;
        } else {
          obj.description = "None";
        }

        if(obj.balanceQty > 0){
          grandTotalBalanceQty += obj.balanceQty;
        }
        content.push(obj);

        index += 1;
      });
    }

    data.footer.grandTotalAvgPrice = numeral(grandTotalAvgPrice).format('0,0.00 $');
    data.footer.grandTotalBalanceQty = grandTotalBalanceQty;

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
