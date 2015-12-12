Template.dental_specialTreatmentInfo.helpers({
  data: function() {
    var self = this;
    var getData = Dental.Collection.SpecialTreatment.find({
      specialRegisterId: self.specialRegisterId
    });

    return getData;
  }
});
