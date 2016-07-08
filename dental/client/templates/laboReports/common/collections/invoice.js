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
            //type: "select2",
            type: "selectize",
            options: function () {
                return Dental.List.diseaseItemForInvoice();
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
    doctorShare: {
        type: Array,
        minCount: 0,
        label:"Income By Doctor",
        optional: true
    },
    'doctorShare.$': {
        type: Object
    },
    'doctorShare.$.doctor': {
        type: String,
        autoform: {
            //type: "select2",
            type: "selectize",
            options: function () {
                return Dental.List.doctor();
            }
        }
    },
    'doctorShare.$.amount': {
        type: Number,
        decimal: true
    },
    doctorShareTotal: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    laboExpense: {
        type: Array,
        minCount: 0,
        label:"Labo Expense",
        optional: true
    },
    'laboExpense.$': {
        type: Object
    },
    'laboExpense.$.doctor': {
        type: String,
        autoform: {
            //type: "select2",
            type: "selectize",
            options: function () {
                return Dental.List.doctor();
            }
        }
    },
    'laboExpense.$.amount': {
        type: Number,
        decimal: true
    },
    laboExpenseTotal: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    subtotal: {
        type: Number,
        decimal: true
    },
    deposit: {
        type: Number,
        decimal: true
    },
    subDiscount: {
        type: Number,
        decimal: true,
        min: 0,
        max: 100,
        defaultValue: 0
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