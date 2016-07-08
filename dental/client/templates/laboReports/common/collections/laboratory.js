/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Laboratory = new Mongo.Collection('dental_laboratory');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Laboratory = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    price: {
        type: Number,
        decimal: true
    },
    branchId:{
        type:String
    }
});

/**
 * attachSchema
 */
Dental.Collection.Laboratory.attachSchema(Dental.Schema.Laboratory);