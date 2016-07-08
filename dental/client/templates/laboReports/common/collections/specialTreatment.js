/**
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.SpecialTreatment = new Mongo.Collection(
  'dental_specialTreatment');

/**
 *
 * @type {SimpleSchema}
 */
Dental.Schema.SpecialTreatment = new SimpleSchema({
  patientId: {
    type: String
  },
  specialRegisterId: {
    type: String
  },
  specialTreatmentDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    },
    label: "Treatment Date"
  },
  doctorId: {
    type: String,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.doctorForOther();
      }
    }
  },
  des: {
    type: String,
    label: "Description",
    autoform: {
      afFieldInput: {
        type: 'summernote',
        class: 'editor',
        settings: {
          height: 92,
          toolbar: [
            //[groupname, [button list]]
            ['style', ['bold', 'italic', 'underline']],
            ['font', ['strikethrough']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            // ['insert', ['picture']],
            ['misc', ['fullscreen']],
          ]
        }
      }
    }
  },
  attachFile: {
    type: [String],
    label: 'Choose file',
    optional: true
  },
  "attachFile.$": {
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Files'
      }
    }
  },
  // attachFile: {
  //   type: String,
  //   label: 'Choose file',
  //   autoform: {
  //     afFieldInput: {
  //       type: 'fileUpload',
  //       collection: 'Files'
  //     }
  //   },
  //   optional: true
  // },
  branchId: {
    type: String
  }
});

/**
 * Attache schema
 */
Dental.Collection.SpecialTreatment.attachSchema(Dental.Schema.SpecialTreatment);
