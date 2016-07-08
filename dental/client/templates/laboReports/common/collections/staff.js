/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Dental.Collection.Staff = new Mongo.Collection("dental_staff");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Dental.Schema.Staff = new SimpleSchema({
  name: {
    type: String,
    unique: true,
    max: 250
  },
  gender: {
    type: String,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.gender();
      }
    }
  },
  position: {
    type: String,
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.position();
      }
    }
  },
  startDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD');
      return currentDate;
    },
    label: "Start Date"
  },
  address: {
    type: String,
    max: 500
  },
  telephone: {
    type: String,
    optional: true,
    max: 50
  },
  branchId: {
    type: String
  }
});

/**
 * Attach schema
 */
Dental.Collection.Staff.attachSchema(Dental.Schema.Staff);
