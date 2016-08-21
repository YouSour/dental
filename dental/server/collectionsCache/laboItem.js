// Collection
Dental.Collection.LaboItem.cacheDoc('unit', Dental.Collection.LaboUnit, ['name', 'des'], {
  referenceField: 'unitId'
});

Dental.Collection.LaboItem.cacheDoc('itemCategories', Dental.Collection.LaboItemCategories, ['code','name'], {
  referenceField: 'itemCategoriesId'
});

Dental.Collection.LaboItem.cacheArrayField(['materialMap']);
Dental.Collection.LaboItem.cacheArrayField(['departmentMap']);
