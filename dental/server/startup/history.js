Meteor.startup(function () {
    if (Dental.Collection.PatientHistory.find().count() == 0) {
        var data = [
            {
                _id: "001",
                name: "X",
                branchId: '001'
            },
            {
                _id: "002",
                name: "Y",
                branchId: '001'
            },
            {
                _id: "003",
                name: "Z",
                branchId: '001'
            }

        ];

        _.each(data, function (obj) {
            Dental.Collection.PatientHistory.insert(obj);
        });
    }
});