Dental.Collection.SpecialPayment.before.insert(function(userId, doc) {
  if (doc.balance == 0) {
    doc.status = "Close";
  }

  //generate Id
  var id = doc._id;
  var branchPre = doc._id;
  doc._id = idGenerator.genWithPrefix(Dental.Collection.SpecialPayment,
    branchPre, 3);
  Dental.ListState.set(id, doc.specialRegisterId);
});
Dental.Collection.SpecialPayment.after.insert(function(userId, doc) {
  Meteor.defer(function() {
    updateSpecialRegister(doc);
  });
});

Dental.Collection.SpecialPayment.before.update(function(userId, doc, fieldNames,
  modifier, options) {
  modifier.$set = modifier.$set || {};

  if (modifier.$set.balance == 0) {
    modifier.$set.status = "Close";
  }
});

Dental.Collection.SpecialPayment.after.remove(function(userId, doc) {
  Meteor.defer(function() {
    Dental.Collection.SpecialRegister.direct.update({
      _id: doc.specialRegisterId
    }, {
      $set: {
        status: "Active",
        closingDate: doc._specialRegister.registerDate
      }
    });
  });

});

var updateSpecialRegister = function(doc) {
  if (doc.paymentMethod == doc._specialRegister.paymentMethod.length) {
    Dental.Collection.SpecialRegister.direct.update({
      _id: doc.specialRegisterId
    }, {
      $set: {
        status: "Close",
        closingDate: doc.paymentDate
      }
    });
  }
};
