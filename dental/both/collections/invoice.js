/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Invoice = new Mongo.Collection('dental_invoice');

Dental.Schema.Invoice = new SimpleSchema({
    patientId: {
        type: String
    },
    registerId: {
        type: String
    },
    invoiceDate: {
        type: String,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    des: {
        type: String,
        label: 'Description',
        optional: true
    },
    disease: {
        type: Array,
        minCount: 1
    },
    'disease.$': {
        type: Object
    },
    'disease.$.item': {
        type: String,
        autoform: {
            type: "select",
            //type: "selectize",
            options: function () {
                return Dental.List.diseaseItem();
            }
        }
    },
    'disease.$.qty': {
        type: Number,
        min: 1
    },
    'disease.$.price': {
        type: Number,
        decimal: true,
        min: 1
    },
    'disease.$.discount': {
        type: Number,
        min: 0,
        max: 100
    },
    'disease.$.amount': {
        type: Number,
        decimal: true
    },
    subtotal: {
        type: Number,
        decimal: true
    },
    deposit: {
        type: Number,
        decimal: true
    },
    total: {
        type: Number,
        decimal: true
    },
    branchId: {
        type: String
    }
});

/***
 *AttachSchema
 */
Dental.Collection.Invoice.attachSchema(Dental.Schema.Invoice);