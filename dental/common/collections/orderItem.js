/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.OrderItem = new Mongo.Collection('dental_orderItem');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.OrderItem = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    price: {
        type: Number,
        decimal: true
    },
    unit: {
        type: String,
        max: 250
    },
    orderCategoryId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.orderCategory();
            }
        }
    },
    branchId:{
      type:String
    }
});

/**
 * attachSchema
 */
Dental.Collection.OrderItem.attachSchema(Dental.Schema.OrderItem);
