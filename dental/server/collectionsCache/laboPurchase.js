// Collection
Dental.Collection.LaboPurchase.cacheDoc('supplier', Dental.Collection.LaboSupplier, ['name', 'address','telephone','des'], {
  referenceField: 'supplierId'
});

Dental.Collection.LaboPurchase.cacheDoc('staff', Dental.Collection.Staff, ['name', 'gender','position','startDate','address','telephone'], {
  referenceField: 'staffId'
});

Dental.Collection.LaboPurchase.cacheArrayField(['purchaseDetail']);
