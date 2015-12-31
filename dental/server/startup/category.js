Meteor.startup(function() {
  if (Dental.Collection.DiseaseCategory.find().count() == 0) {
    var data = [{
      _id: "001",
      code: "A",
      name: "Apple",
      branchId: "001"
    }, {
      _id: "002",
      code: "B",
      name: "Ball",
      branchId: "001"
    }];

    _.each(data, function(obj) {
      Dental.Collection.DiseaseCategory.insert(obj);
    });
  }
});
