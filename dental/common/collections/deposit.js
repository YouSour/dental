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
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    amount: {
        type: Number,
        decimal: true
    }
});

Dental.Collection.Deposit.attachSchema(Dental.Schema.Deposit);