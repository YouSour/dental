Meteor.startup(function () {

    // Chart Account
    if (Dental.Collection.CashChartAccount.find().count() == 0) {
        var data = [
            {name: 'Opening Cash', cashType: 'Opening', memo: ''},
            {name: 'Closing Cash', cashType: 'Closing', memo: ''},
            // Other
            {name: 'Training In', cashType: 'In', memo: ''},
            {name: 'MIS In', cashType: 'In', memo: ''},
            {name: 'Maintenance In', cashType: 'In', memo: ''},
            {name: 'Web Design In', cashType: 'In', memo: ''},
            {name: 'Repairing In', cashType: 'In', memo: ''},
            {name: 'Service In', cashType: 'In', memo: ''},
            {name: 'House Rental', cashType: 'Out', memo: ''},
            {name: 'Salary', cashType: 'Out', memo: ''},
            {name: 'Utility', cashType: 'Out', memo: ''},
            {name: 'Internet Service', cashType: 'Out', memo: ''},
            {name: 'Office Stationary', cashType: 'Out', memo: ''},
            {name: 'Computer Maintenance', cashType: 'Out', memo: ''},
            {name: 'Mission', cashType: 'Out', memo: ''},
        ];

        _.forEach(data, function (val) {
            Dental.Collection.CashChartAccount.insert(val);
        });
    }

    // Cashier
    if (Dental.Collection.CashCashier.find().count() == 0) {
        var data = {
            name: 'Rabbit',
            gender: 'M',
            dob: moment('2014-09-09').toDate(),
            address: 'Battambang',
            telephone: '053 50 66 777',
            cpanel_branchId: '001'
        };

        Dental.Collection.CashCashier.insert(data);
    }

    // Cash Map
    if (Dental.Collection.CashMap.find().count() == 0) {
        var data = [
            {mapType: 'Clinic Deposit Payment', chartAccountId: ''},
            {mapType: 'Clinic Payment', chartAccountId: ''},
            {mapType: 'Clinic Special Payment', chartAccountId: ''},
            {mapType: 'Labo Payment', chartAccountId: ''},
        ];

        _.each(data, function (val) {
            Dental.Collection.CashMap.insert(val);
        });
    }

});
