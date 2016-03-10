/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Register = new Mongo.Collection('dental_register');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Register = new SimpleSchema({
    patientId: {
        type: String
        //autoform: {
        //  type: "select2",
        //  options: function() {
        //    return Dental.List.patient();
        //  }
        //}
    },
    registerDate: {
        type: String,
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"),
                'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        },
        label: "Register Date"
    },
    des: {
        type: String,
        label: "Description",
        max: 500,
        optional: true
    },
    status: {
        type: String,
        optional: true
    },
    closingDate: {
        type: String,
        label: "Closing Date"
    },
    disease: {
        type: Array,
        minCount: 0
    },
    'disease.$': {
        type: Object
    },
    'disease.$.item': {
        type: String,
        autoform: {
            type: "select",
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
        max: 100,
        decimal: true
    },
    'disease.$.amount': {
        type: Number,
        decimal: true
    },
    doctorShare: {
        type: Array,
        minCount: 0,
        label: "Income By Doctor",
        optional: true
    },
    'doctorShare.$': {
        type: Object
    },
    'doctorShare.$.doctor': {
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return Dental.List.doctor();
            }
        }
    },
    'doctorShare.$.amount': {
        type: Number,
        decimal: true,
        min: 0,
        custom: function () {
            if (this.value > this.field('total').value) {
                return "greaterThan";
            }
        }
    },
    doctorShareTotal: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    laboExpense: {
        type: Array,
        minCount: 0,
        label: "Laboratory Expense",
        optional: true
    },
    'laboExpense.$': {
        type: Object
    },
    'laboExpense.$.laboratory': {
        type: String,
        autoform: {
            type: "select",
            options: function () {
                return Dental.List.laboratoryItem();
            }
        }
    },
    'laboExpense.$.amount': {
        type: Number,
        decimal: true,
        min: 0,
        custom: function () {
            if (this.value > this.field('total').value) {
                return "greaterThan";
            }
        }
    },
    laboExpenseTotal: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    subTotal: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        label: "Sub Total"
    },
    deposit: {
        type: Number,
        decimal: true,
        defaultValue: 0
    },
    subDiscount: {
        type: Number,
        decimal: true,
        defaultValue: 0,
        label: "Sub Discount ($)"
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
Dental.Collection.Register.attachSchema(Dental.Schema.Register);

/*
 * Custom Error Message
 */
SimpleSchema.messages({
    "greaterThan": "Amount Can't Be Greater Than Total",
    "smallerThan": "Amount Can't Be Smaller Than Total"
});
