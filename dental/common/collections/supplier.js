/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Supplier = new Mongo.Collection('dental_supplier');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Supplier = new SimpleSchema({
  name: {
    type: String,
    unique: true,
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
Dental.Collection.Supplier.attachSchema(Dental.Schema.Supplier);
