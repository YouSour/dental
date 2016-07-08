// Collection
Dental.Collection.LaboMaterial.cacheDoc('materialCategory', Dental.Collection.LaboMaterialCategory, ['name', 'des'], {
  referenceField: 'materialCategoryId'
});

Dental.Collection.LaboMaterial.cacheDoc('unit', Dental.Collection.LaboUnit, ['name','des'], {
  referenceField: 'unitId'
});
