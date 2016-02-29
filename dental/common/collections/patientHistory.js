/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.PatientHistory = new Mongo.Collection('dental_patientHistory');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.PatientHistory = new SimpleSchema({
  name: {
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
  },
  branchId:{
    type:String
  }
});

/*
 * Attach Schema
 */

Dental.Collection.PatientHistory.attachSchema(Dental.Schema.PatientHistory);
