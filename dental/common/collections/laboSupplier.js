/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.LaboSupplier = new Mongo.Collection('labo_supplier');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.LaboSupplier = new SimpleSchema({
  name: {
    type: String,
    max: 250
  },
  telephone: {
    type: String,
    max: 50
  },
  address: {
    type: String,
    max: 500
  },
  des: {
    type: String,
    optional: true,
    label: "Description",
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor',
        settings: {
          height: 100,
          toolbar: [
            //[groupname, [button list]]
            ['style', ['bold', 'italic', 'underline']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['misc', ['fullscreen']]
          ]
        }
      }
    }
  },
  branchId: {
    type: String
  }
});

/**
 * attachSchema
 */
Dental.Collection.LaboSupplier.attachSchema(Dental.Schema.LaboSupplier);
