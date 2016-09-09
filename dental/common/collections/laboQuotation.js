// Laboratory Quotation
Dental.Collection.LaboQuotation = new Mongo.Collection('labo_Quotation');

//Schema
Dental.Schema.LaboQuotation = new SimpleSchema({
  staffId: {
    type: String,
    label: "Staff",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.staff();
      }
    }
  },
  doctorCompanyId: {
    type: String,
    label: "Department",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboCustomerCompany();
      }
    }
  },
  saleOrderId: {
    type: String,
    label: "Sale Order ID"
  },
  type: {
    type: String,
    label: "Type",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboQuotationType();
      }
    },
    defaultValue: 'New-do'
  },
  status: {
    type: String,
    label: "Status",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboQuotationStatus();
      }
    },
    defaultValue:'Hurry'
  },
  startDate: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    },
    label: "Start Date"
  },
  deadLine: {
    type: String,
    defaultValue: function() {
      var currentDate = moment(ReactiveMethod.call("currentDate"),
        'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
      return currentDate;
    },
    label: "Deadline"
  },
  des: {
    type: String,
    label: "Description",
    optional: true
  },
  department: {
    type: Array,
    minCount: 0
  },
  'department.$': {
    type: Object
  },
  'department.$.department': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.laboDepartment();
      }
    }
  },
  'department.$.item': {
    type: String,
    autoform: {
      type: "selectize",
      options: function() {
        return Dental.List.laboItems();
      }
    }
  },
  'department.$.qty': {
    type: Number,
    min: 1,
    decimal: true
  },
  branchId: {
    type: String
  }
});

Dental.Collection.LaboQuotation.attachSchema(Dental.Schema.LaboQuotation);
