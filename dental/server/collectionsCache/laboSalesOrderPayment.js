// Collection
Dental.Collection.LaboSalesOrderPayment.cacheDoc('customer', Dental.Collection.LaboCustomer, ['name','customerCompanyId','gender','address','telephone','des','_customerCompany'], {
  referenceField: 'customerId'
});

Dental.Collection.LaboSalesOrderPayment.cacheDoc('staff', Dental.Collection.Staff, ['name', 'gender','position','startDate','address','telephone'], {
  referenceField: 'staffId'
});
