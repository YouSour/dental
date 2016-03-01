Meteor.startup(function () {
    if (Dental.Collection.OrderCategory.find().count() == 0) {
        var data = [
            {
                "_id": "001",
                "name": "Water",
                "des": "Testing",
                branchId: '001'
            },
            {
                "_id": "002",
                "name": "Internet",
                "des": "testing",
                branchId: '001'
            },
            {
                "_id": "003",
                "name": "Food",
                "des": "testing",
                branchId: '001'
            }
        ];

        _.each(data, function (obj) {
            Dental.Collection.OrderCategory.insert(obj);
        });
    }
});