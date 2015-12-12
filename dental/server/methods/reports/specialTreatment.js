Meteor.methods({
  dental_specialTreatment: function(params) {
    var self = params;
    var data = {
      title: {},
      header: {},
      content: []
    };

    /********* Title *********/
    var company = Cpanel.Collection.Company.findOne();
    data.title = {
      company: company
    };

    /********* Header ********/
    var registerDoc = Dental.Collection.SpecialRegister.findOne(self.specialRegister);
    data.header = registerDoc;

    /********** Content & Footer **********/
    var content = [];

    // Get invoice
    var index = 1;
    Dental.Collection.SpecialTreatment.find({
        specialRegisterId: self.specialRegister
      })
      .forEach(function(obj) {
        obj.index = index;
        content.push(obj);

        index += 1;
      });

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
