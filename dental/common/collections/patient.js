/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Patient = new Mongo.Collection("dental_patient");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Patient = new SimpleSchema({
    name: {
        type: String,
        max: 250
    },
    gender: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.gender();
            }
        }
    },
    age: {
        type: Number,
        max: 110,
        min: 1,
        optional:true
    },
    occupation: {
        type: String,
        optional: true
    },
    address: {
        type: String,
        max: 500,
        optional: true
    },
    telephone: {
        type: String,
        max: 50,
        optional: true
    },
    history: {
        type: [String],
        autoform: {
            type: "select-multiple",
            options: function () {
                return Dental.List.history();
            }
        },
        optional: true
    },
    member: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.member();
            }
        }
    },
    des: {
        type: String,
        label: "Description",
        optional: true,
        max: 500
    },
    photo: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        },
        optional: true
    },
    branchId: {
        type: String
    }
});

/**
 * Attach schema
 */
Dental.Collection.Patient.attachSchema(Dental.Schema.Patient);
