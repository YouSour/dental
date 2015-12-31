/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.DiseaseCategory = new Mongo.Collection(
  "dental_diseaseCategory");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.DiseaseCategory = new SimpleSchema({
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
  branchId: {
    type: String
  }
});

/**
 * Attache Schema
 */
Dental.Collection.DiseaseCategory.attachSchema(Dental.Schema.DiseaseCategory);
