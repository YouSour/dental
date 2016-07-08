// Collection
Dental.Collection.CalendarEvent = new Mongo.Collection('dental_calendarEvent');

// Schema
Dental.Schema.CalendarEvent = new SimpleSchema({
  registerId: {
    type: String
  },
  start: {
    type: String,
    label: 'Event Date',
    defaultValue: function() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  },
  end: {
    type: String,
    optional: true
  },
  title: {
    type: String,
    max: 500
  },
  doctorId: {
    type: String,
    label: "Doctor",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.doctorForOther();
      }
    }
  },
  status: {
    type: String,
    label: "Status",
    defaultValue: 'Enable'
  },
  branchId: {
    type: String
  }
});

// Attach schema
Dental.Collection.CalendarEvent.attachSchema(Dental.Schema.CalendarEvent);
