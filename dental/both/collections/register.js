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

    registerDate: {
        type: String,
        label:"Register Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD H:mm:ss');
            return currentDate;
        }
    },
    patientId: {
        type: String,
        label: "Patient",
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.patient();
            }
        }
    }, diagnosis: {
        label: "Diagnosis",
        type: Array,
        minCount: 1
    },
    'diagnosis.$': {
        type: Object
    },
    'diagnosis.$.diagnosisId': {
        type: String,
        autoform: {
            type: "select2",
            //type: "selectize",
            options: function () {
                return Dental.List.diagnosis();
            }
        }
    },
    'diagnosis.$.qty': {
        type: Number,
        min:1
    },
    'diagnosis.$.price': {
        type: Number,
        decimal: true,
        min:1
    },
    'diagnosis.$.discount': {
        type: Number,
        min:0,
        max:100
    },
    'diagnosis.$.amount': {
        type: Number,
        decimal: true
    },
    total: {
        type: Number,
        decimal: true,
        autoform: {
            afFieldInput: {
                type: "hidden"
            }
        }
    },
    des: {
        type: String,
        label: "Description",
        autoform: {
            afFieldInput: {
                type: "textarea"
            }
        }
    },
    createdDate: {
        type: Date,
        autoValue: function () {
            if (this.isInsert) {
                return new Date();
            }
        },
        denyUpdate: true
    },
    updatedDate: {
        type: Date,
        autoValue: function () {
            return new Date();
        }
    }
});

/***
 *AttachSchema
 */
Dental.Collection.Register.attachSchema(Dental.Schema.Register);