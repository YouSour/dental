Dental.Collection.Deposit.after.insert(function (userId, doc) {
    Meteor.defer(function () {
        var deposit = doc.amount;
        var total = deposit * (-1);
        Dental.Collection.Register.update(doc.registerId, {$inc: {deposit: deposit, total: total}});
    });
});

//Dental.Collection.Deposit.after.update(function (userId, doc, fieldNames, modifier, options) {
//    modifier.$set = modifier.$set || {};
//    var self = this;
//
//    if (!_.isUndefined(modifier.$set.amount)) {
//        Meteor.defer(function () {
//            var deposit = (self.previous.amount - modifier.$set.amount) * (-1);
//            var total = deposit * (-1);
//
//            Dental.Collection.Register.update(doc.registerId, {$set: {$inc: {deposit: deposit, total: total}}});
//        });
//    }
//});

Dental.Collection.Deposit.after.remove(function (userId, doc) {
    Meteor.defer(function () {
        var deposit = doc.amount * (-1);
        var total = doc.amount;
        Dental.Collection.Register.update(doc.registerId, {$set: {$inc: {deposit: deposit, total: total}}});
    });
});
