/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.LaboItemCategories = new Mongo.Collection("labo_itemCategories");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.LaboItemCategories = new SimpleSchema({
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
Dental.Collection.LaboItemCategories.attachSchema(Dental.Schema.LaboItemCategories);
