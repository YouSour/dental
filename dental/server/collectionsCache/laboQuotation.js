// Collection
Dental.Collection.LaboQuotation.cacheDoc(
    'staff',
    Dental.Collection.Staff,
    ['name', 'gender', 'position','address','telephone']
);

Dental.Collection.LaboQuotation.cacheDoc(
    'doctorCompany',
    Dental.Collection.LaboCustomerCompany,
    ['name','address','telephone']
);

Dental.Collection.LaboQuotation.cacheArrayField('department');
