Meteor.methods({
  dental_laboQuotation: function(params) {
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
    var quotationDoc = Dental.Collection.LaboQuotation.findOne(self.laboQuotation);

    data.header = quotationDoc;

    /********** Content & Footer **********/
    var content = [];

    // Each item
    var index = 1;
    _.each(quotationDoc.department, function(obj) {
      // var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
      obj.index = index;
      obj.departmentName = obj.departmentDoc.name;
      obj.itemName = obj.itemDoc.name;

      content.push(obj);

      index += 1;
    });
    data.footer.startDate = moment(quotationDoc.startDate).format("DD-MM-YYYY");
    data.footer.deadLine = moment(quotationDoc.deadLine).format("DD-MM-YYYY");

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
