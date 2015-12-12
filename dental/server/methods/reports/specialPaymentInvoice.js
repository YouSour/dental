Meteor.methods({
  getSpecialPayment: function(id) {
    var specialPaymentId = Dental.ListState.get(id);
    return specialPaymentId;
  }
});
