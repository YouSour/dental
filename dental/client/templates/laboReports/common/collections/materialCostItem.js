/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.MaterialCostItem = new Mongo.Collection('dental_materialCostItem');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.MaterialCostItem = new SimpleSchema({
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
    materialCostCategoryId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Dental.List.materialCostCategory();
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
Dental.Collection.MaterialCostItem.attachSchema(Dental.Schema.MaterialCostItem);
