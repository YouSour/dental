//Laboratory Unit
Dental.Collection.LaboCustomerCompany = new Mongo.Collection('labo_customerCompany');

//Schema
Dental.Schema.LaboCustomerCompany = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    max: 200
  },
  address:{
    type:String
  },
  telephone:{
    type:String
  },
  branchId: {
    type: String,
  }
});

//Attach Schema
Dental.Collection.LaboCustomerCompany.attachSchema(Dental.Schema.LaboCustomerCompany);
