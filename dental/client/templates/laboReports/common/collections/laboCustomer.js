//Collection
Dental.Collection.LaboCustomer = new Mongo.Collection("labo_customer");

//Schema
Dental.Schema.LaboCustomer = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 250
  },
  customerCompanyId: {
    type: String,
    label: "Company",
    autoform: {
      type: "select2",
      options: function() {
        return Dental.List.laboCustomerCompany();
      }
    }
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
  address: {
    type: String,
    max: 500
  },
  telephone: {
    type: String,
    max: 50
  },
  des: {
    type: String,
    optional: true,
    max: 500
  },
  branchId: {
    type: String
  }
});

//Attach schema
Dental.Collection.LaboCustomer.attachSchema(Dental.Schema.LaboCustomer);
