Meteor.startup(function () {
    if (Dental.Collection.OrderItem.find().count() == 0) {
        var data = [
            {
                "_id": "000001",
                "orderCategoryId": "001",
                "name": "Lyyon",
                "price": 10,
                "unit": "L",
                branchId: '001',

                "_orderCategory": {
                    "name": "Water"
                }
            },
            {
                "_id": "000002",
                "orderCategoryId": "001",
                "name": "Vital",
                "price": 20,
                "unit": "L",
                branchId: '001',
                "_orderCategory": {
                    "name": "Water"
                }
            },
            {
                "_id": "000003",
                "orderCategoryId": "002",
                "name": "Ezecom",
                "price": 30,
                "unit": "Mb/s",
                branchId: '001',
                "_orderCategory": {
                    "name": "Internet"
                }
            }
        ];
        data.forEach(function (obj) {
            Dental.Collection.OrderItem.insert(obj);
        });
    }
});