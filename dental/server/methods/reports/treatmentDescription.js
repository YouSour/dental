Meteor.methods({
  dental_treatmentDescription: function(params) {
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

    // Get treament
    Dental.Collection.Treatment.find({
        _id: self.treatmentId
      })
      .forEach(function(obj) {
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
