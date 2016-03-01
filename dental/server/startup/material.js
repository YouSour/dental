Meteor.startup(function () {
    if (Dental.Collection.MaterialCostCategory.find().count() == 0) {
        // Category
        for (var i = 1; i <= 5; i++) {
            var cateId = idGenerator.gen(Dental.Collection.MaterialCostCategory, 3);
            Dental.Collection.MaterialCostCategory.insert({
                _id: cateId,
                name: Fake.word(),
                des: Fake.word(),
                branchId: '001'
            });

            // Item
            for (var j = 1; j <= 3; j++) {
                var itemId = idGenerator.gen(Dental.Collection.MaterialCostItem, 6);
                Dental.Collection.MaterialCostItem.insert({
                    _id: itemId,
                    materialCostCategoryId: cateId,
                    name: Fake.word(),
                    price: Fake.fromArray([10, 20, 30, 40, 50]),
                    unit: Fake.fromArray(['kg', 'package']),
                    branchId: '001'
                });
            }
        }

    }
});