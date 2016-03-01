/***
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.MaterialCostCategory = new Mongo.Collection(
    'dental_materialCostCategory');

/***
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.MaterialCostCategory = new SimpleSchema({
    name: {
        type: String,
        unique: true,
        max: 250
    },
    branchId: {
        type: String
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
Dental.Collection.MaterialCostCategory.attachSchema(Dental.Schema.MaterialCostCategory);
