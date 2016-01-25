Meteor.methods({
  dental_treatmentDescription: function(params) {
    var self = params;
    var data = {
      title: {},
      header: {},
      content: []
    };

    /********** Content & Footer **********/
    var content = [];
    // Get treament
    Dental.Collection.Treatment.find({
        _id: self.treatmentId
      })
      .forEach(function(obj) {

        // Patient Photo
        obj.patientPhoto = "/no-image.png";
        if (!_.isUndefined(obj._register._patient.photo)) {
          obj.patientPhoto = Files.findOne(obj._register
            ._patient
            .photo).url();
        }

        //Patient Info
        obj.patient = obj.patientId + " : " + obj._register._patient.name +
          " (" + obj._register._patient.gender + ")";
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
          // console.log(obj.images);
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
