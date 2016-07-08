// Collection
Dental.Collection.LaboSalesOrder.cacheDoc('customer', Dental.Collection.LaboCustomer, ['name','customerCompanyId','gender','address','telephone','des','_customerCompany'], {
  referenceField: 'customerId'
});

Dental.Collection.LaboSalesOrder.cacheDoc('staff', Dental.Collection.Staff, ['name', 'gender','position','startDate','address','telephone'], {
  referenceField: 'staffId'
});

Dental.Collection.LaboSalesOrder.cacheCount('salesOrderPaymentCount', Dental.Collection.LaboSalesOrderPayment,'saleOrderId');

Dental.Collection.LaboSalesOrder.cacheArrayField(['salesOrderDetail']);
