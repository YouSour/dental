/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.OrderCategory = new Mongo.Collection('dental_orderCategory');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.OrderCategory = new SimpleSchema({
  name: {
    type: String,
    unique: true,
    max: 250
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
  }
});

/**
 * attachSchema
 */
Dental.Collection.OrderCategory.attachSchema(Dental.Schema.OrderCategory);
