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
        // Patient Photo
        obj.patientPhoto = "/no-image.png";
        if (!_.isUndefined(obj._specialRegister._patient.photo)) {
          obj.patientPhoto = Files.findOne(obj._specialRegister
            ._patient
            .photo).url();
        }

        //Patient Info
        obj.patient = obj.patientId + " : " + obj._specialRegister._patient.name +
          " (" + obj._specialRegister._patient.gender + ")";
        //Doctor Info
        obj.doctor = obj.doctorId + " : " + obj._doctor.name + " (" +
          obj._doctor.gender + ")";

          obj.images = [];
          obj.attachFile.forEach(function(id) {
            var imageDoc = Files.findOne(id);
            obj.images.push({
              name: imageDoc.name(),
              link: imageDoc.url(),
              type: imageDoc.type(),
              size: imageDoc.size() + " Kb",
              linkDownload: imageDoc.url() + "?download=true"
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
