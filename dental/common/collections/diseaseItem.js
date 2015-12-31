/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.DiseaseItem = new Mongo.Collection("dental_diseaseItem");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.DiseaseItem = new SimpleSchema({
  diseaseCategoryId: {
    type: String,
    max: 5,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.diseaseCategory();
      }
    }
  },
  code: {
    type: String,
    unique: true,
    max: 50
  },
  name: {
    type: String,
    unique: true,
    max: 250
  },
  price: {
    type: Number,
    decimal: true
  },
  memberPrice: {
    type: Number,
    decimal: true
  },
  branchId: {
    type: String
  }
});

/**
 * Attach schema
 */
Dental.Collection.DiseaseItem.attachSchema(Dental.Schema.DiseaseItem);
