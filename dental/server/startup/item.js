Meteor.startup(function() {
  if (Dental.Collection.DiseaseItem.find().count() == 0) {
    var data = [{
      _id: "000001",
      diseaseCategoryId: "001",
      code: "AI1",
      name: "AItem 1",
      price: 50,
      memberPrice: 40,
      branchId: "001"
    }, {
      _id: "000002",
      diseaseCategoryId: "001",
      code: "AI2",
      name: "AItem 2",
      price: 70,
      memberPrice: 60,
      branchId: "001"
    }, {
      _id: "000003",
      diseaseCategoryId: "002",
      code: "BI1",
      name: "BItem 1",
      price: 50,
      memberPrice: 40,
      branchId: "001"
    }, {
      _id: "000004",
      diseaseCategoryId: "002",
      code: "BI2",
      name: "BItem 2",
      price: 70,
      memberPrice: 60,
      branchId: "001"
    }];

    _.each(data, function(obj) {
      Dental.Collection.DiseaseItem.insert(obj);
    });
  }
});
