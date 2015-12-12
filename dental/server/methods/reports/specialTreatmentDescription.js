Meteor.methods({
  dental_specialTreatmentDescription: function(params) {
    var self = params;
    var data = {
      title: {},
      header: {},
      content: []
    };

    /********* Title *********/
    // var company = Cpanel.Collection.Company.findOne();
    // data.title = {
    //   company: company
    // };

    /********* Header ********/
    // var registerDoc = Dental.Collection.Register.findOne(self.register);
    // data.header = registerDoc;

    /********** Content & Footer **********/
    var content = [];
    // Get special treament
    Dental.Collection.SpecialTreatment.find({
        _id: self.specialTreatmentId
      })
      .forEach(function(obj) {
        obj.images = [];
        obj.attachFile.forEach(function(id) {
          obj.images.push({
            link: Files.findOne(id).url()
          });
        });
        content.push(obj);
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
