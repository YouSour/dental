/**
 * Dental.CashList
 */
Dental.CashList = {
    currency: function (selectOne) {
        var list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }

        Cpanel.Collection.Currency.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' (' + obj.num + ')', value: obj._id})
            });

        return list;
    },
    currencyForReport: function () {
        var list = [];
        list.push({label: "(All)", value: ""});

        Cpanel.Collection.Currency.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' (' + obj.num + ')', value: obj._id})
            });

        return list;
    },
    cashType: function (selectOne, getCash) {
        var list = [];
        // if (selectOne) {
        //     list.push({label: "(Select One)", value: ""});
        // }

        if (getCash) {
            list.push({label: 'Opening Cash', value: 'Opening'});
            list.push({label: 'Closing Cash', value: 'Closing'});
        }

        list.push({label: 'Cash In', value: 'In'});
        list.push({label: 'Cash Out', value: 'Out'});

        return list;
    },
    cashTypeForReport: function () {
        var list = [];
        list.push({label: "(All)", value: ""});

        list.push({label: 'Opening Cash', value: 'Opening'});
        list.push({label: 'Closing Cash', value: 'Closing'});
        list.push({label: 'Cash In', value: 'In'});
        list.push({label: 'Cash Out', value: 'Out'});

        return list;
    },
    gender: function (selectOne) {
        var list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }

        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    cashier: function (selectOne) {
        var list = [];
        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }
        var cashier = Dental.Collection.CashCashier.find(
            {cpanel_branchId: Session.get('currentBranch')},
            {sort: {_id: 1}}
        );
        cashier.forEach(function (val) {
            list.push({label: val._id + ' : ' + val.name + ' (' + val.gender + ')', value: val._id});
        });

        return list;
    },
    chartAccount: function (selectOne, cashType) {
        cashType = cashType ? cashType : Session.get('cashType');
        var list = [];

        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }
        var chartAccount = Dental.Collection.CashChartAccount.find({cashType: cashType}, {sort: {name: 1}});
        chartAccount.forEach(function (val) {
            list.push({label: val.name, value: val._id});
        });

        return list;
    },
    chartAccountForMap: function (selectOne) {
        var list = [];

        if (selectOne) {
            list.push({label: "(Select One)", value: ""});
        }
        var chartAccount = Dental.Collection.CashChartAccount.find({cashType: {$in: ['In', 'Out']}}, {sort: {name: 1}});
        chartAccount.forEach(function (val) {
            list.push({label: val.name, value: val._id});
        });

        return list;
    },
    branch: function () {
        var list = [];
        list.push({label: "(All)", value: ""});

        Cpanel.Collection.Branch.find()
            .forEach(function (obj) {
                list.push({label: obj.enName, value: obj._id});
            });

        return list;
    },
    exchange: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Cpanel.Collection.Exchange.find({}, {sort: {exDate: -1}})
            .forEach(function (obj) {
                var label = moment(obj.exDate).format('YYYY-MM-DD') +
                    ' | Rates: ' + numeral(obj.rates.USD).format('0,0.00') + '$' +
                    ' = ' + numeral(obj.rates.KHR).format('0,0.00') + 'R' + ' = ' +
                    numeral(obj.rates.THB).format('0,0.00') + 'B';

                list.push({label: label, value: obj._id});
            });
        return list;
    },
};
