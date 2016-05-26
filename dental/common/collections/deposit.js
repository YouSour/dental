/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Deposit = new Mongo.Collection('dental_deposit');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Deposit = new SimpleSchema({
  patientId: {
    type: String
  },
  registerId: {
    type: String
  },
  depositDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    },
    label: "Deposit Date"
  },
  amount: {
    type: Number,
    decimal: true
  },
  branchId: {
    type: String
  }
});

Dental.Collection.Deposit.attachSchema(Dental.Schema.Deposit);
