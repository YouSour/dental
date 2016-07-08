//Laboratory Material Category
Dental.Collection.LaboMaterialCategory = new Mongo.Collection('labo_materialCategory');

//Schema
Dental.Schema.LaboMaterialCategory = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    max: 200
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

//Attach Schema
Dental.Collection.LaboMaterialCategory.attachSchema(Dental.Schema.LaboMaterialCategory);
