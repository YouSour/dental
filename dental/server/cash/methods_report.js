// Cash Methods for Reports
Meteor.methods({
    dental_cashTransactionReport: function (params) {
        this.unblock();

        var data = {
            title: {},
            header: {},
            content: [{
                index: 'No Result'
            }],
            footer: {},
            sign: {}
        };

        var repDate = params.repDate.split(" - ");
        var fDate = moment(repDate[0], "MM/DD/YYYY").startOf('day').toDate();
        var tDate = moment(repDate[1], "MM/DD/YYYY").endOf("day").toDate();

        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        var header = {
            repDate: moment(fDate).format('DD/MM/YYYY') + ' - ' + moment(tDate).format('DD/MM/YYYY'),
        };

        // Exchange
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(params.exchange);
        header.exchangeStr = JSON.stringify(exchangeDoc.rates, null, ' ');

        // Branch
        var branchLbl = 'All';
        if (params.branchId != branchLbl) {
            var branchDoc = Cpanel.Collection.Branch.findOne({_id: params.branchId});
            branchLbl = branchDoc._id + " : " + branchDoc.enName;
        }

        header.branch = branchLbl;
        header.currency = params.currencyId ? params.currencyId : 'All';
        data.header = header;

        /****** Content *****/
        var content = [];
        var selector = {};

        selector.transactionDate = {
            $gte: fDate,
            $lte: tDate
        };
        if (params.branchId != "All") selector.cpanel_branchId = params.branchId;
        if (params.currencyId != "All") selector.currencyId = params.currencyId;

        var index = 1;
        var subTotalKhr = 0, subTotalUsd = 0, subTotalThb = 0;
        Dental.Collection.CashTransaction.find(
            selector,
            {
                sort: {
                    transactionDate: 1
                }
            }).forEach(function (obj) {
            // Do something
            obj.index = index;

            if (obj.currencyId == 'KHR') {
                subTotalKhr += obj.totalAmount;
            } else if (obj.currencyId == 'USD') {
                subTotalUsd += obj.totalAmount;
            } else if (obj.currencyId == 'THB') {
                subTotalThb += obj.totalAmount;
            }

            content.push(obj);

            index++;
        });

        // Exchange
        fx.base = exchangeDoc.base;
        fx.rates = exchangeDoc.rates;

        var totalUsd = fx.convert(subTotalKhr, {
            from: 'KHR',
            to: "USD"
        });
        totalUsd += fx.convert(subTotalThb, {
            from: 'THB',
            to: "USD"
        });
        totalUsd += subTotalUsd;

        data.footer = {
            subTotalKhr: subTotalKhr,
            subTotalUsd: subTotalUsd,
            subTotalThb: subTotalThb,
            totalUsd: totalUsd
        };

        if (content.length > 0) {
            data.content = content;
        }

        return data;
    },
    dental_cashInOutReport: function (params, repType) {
        this.unblock();

        var data = {
            title: {},
            header: {},
            content: [{
                chartAccountDoc: {name: 'No Result'}
            }],
            footer: {},
            sign: {}
        };

        var repDate = params.repDate.split(" - ");
        var fDate = moment(repDate[0], "MM/DD/YYYY").startOf('day').toDate();
        var tDate = moment(repDate[1], "MM/DD/YYYY").endOf("day").toDate();

        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        var header = {
            repDate: moment(fDate).format('DD/MM/YYYY') + ' - ' + moment(tDate).format('DD/MM/YYYY'),
        };

        // Exchange
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(params.exchange);
        header.exchangeStr = JSON.stringify(exchangeDoc.rates, null, ' ');

        // Branch
        var branchLbl = 'All';
        if (params.branchId != branchLbl) {
            var branchDoc = Cpanel.Collection.Branch.findOne({_id: params.branchId});
            branchLbl = branchDoc._id + " : " + branchDoc.enName;
        }

        header.branch = branchLbl;
        header.currency = params.currencyId ? params.currencyId : 'All';

        data.header = header;

        /****** Content *****/
        var content = [];
        var selector = {};

        selector.transactionDate = {
            $gte: fDate,
            $lte: tDate
        };
        if (params.branchId != "All") selector.cpanel_branchId = params.branchId;
        if (params.currencyId != "All") selector.currencyId = params.currencyId;

        var transaction = Dental.Collection.CashTransaction.aggregate([
            {
                $match: selector
            },
            {$unwind: '$items'},
            {"$match": {'items.chartAccountDoc.cashType': repType}},
            {
                $group: {
                    _id: {currency: '$currencyId', item: '$items.chartAccountId'},
                    totalAmount: {$sum: '$items.amount'},
                    chartAccountDoc: {$last: '$items.chartAccountDoc'}
                }
            },
            {
                $group: {
                    _id: "$_id.item",
                    totalAmount: {
                        $sum: {
                            $cond: {
                                if: {$eq: ["$_id.currency", "KHR"]},
                                then: {$divide: ["$totalAmount", exchangeDoc.rates.KHR]},
                                else: "$totalAmount"
                            }
                        }
                    },
                    chartAccountDoc: {$last: '$chartAccountDoc'}
                }
            },
            {
                $sort: {"chartAccountDoc.name": 1}
            },
            {
                $group: {
                    _id: null,
                    dataItems: {$addToSet: "$$ROOT"},
                    dataSum: {$sum: "$totalAmount"}
                }
            }
        ]);

        if (transaction.length > 0) {
            if (transaction[0].dataItems.length > 0) {
                content = transaction[0].dataItems;
                data.footer = {
                    totalUsd: transaction[0].dataSum
                };
            }
        }

        if (content.length > 0) {
            data.content = content;
        }

        return data;
    },
    dental_cashBalanceReport: function (params) {
        this.unblock();

        var data = {
            title: {},
            header: {},
            content: [{
                _id: 'No Result'
            }],
            footer: {},
            sign: {}
        };

        var repDate = params.repDate.split(" - ");
        var fDate = moment(repDate[0], "MM/DD/YYYY").startOf('day').toDate();
        var tDate = moment(repDate[1], "MM/DD/YYYY").endOf("day").toDate();

        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        var header = {
            repDate: moment(fDate).format('DD/MM/YYYY') + ' - ' + moment(tDate).format('DD/MM/YYYY'),
        };

        // Exchange
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(params.exchange);
        header.exchangeStr = JSON.stringify(exchangeDoc.rates, null, ' ');

        // Branch
        var branchLbl = 'All';
        if (params.branchId != branchLbl) {
            var branchDoc = Cpanel.Collection.Branch.findOne({_id: params.branchId});
            branchLbl = branchDoc._id + " : " + branchDoc.enName;
        }

        header.branch = branchLbl;
        header.currency = params.currencyId ? params.currencyId : 'All';

        data.header = header;

        /****** Content *****/
        var content = [];
        var selector = {};

        selector.transactionDate = {
            $gte: fDate,
            $lte: tDate
        };
        if (params.branchId != "All") selector.cpanel_branchId = params.branchId;
        if (params.currencyId != "All") selector.currencyId = params.currencyId;

        selector.cashType = {$in: ["In", "Out"]};

        var transaction = Dental.Collection.CashTransaction.aggregate([
            {
                "$match": selector
            },
            {
                $unwind: '$items'
            },
            {
                $group: {
                    _id: {currency: '$currencyId', item: '$items.chartAccountId'},
                    totalAmount: {$sum: '$items.amount'},
                    chartAccountDoc: {$last: '$items.chartAccountDoc'}
                }
            },
            {
                $group: {
                    _id: "$_id.item",
                    totalAmount: {
                        $sum: {
                            $cond: {
                                if: {$eq: ["$_id.currency", "KHR"]},
                                then: {$divide: ["$totalAmount", exchangeDoc.rates.KHR]},
                                else: {
                                    $cond: {
                                        if: {$eq: ["$_id.currency", "THB"]},
                                        then: {$divide: ["$totalAmount", exchangeDoc.rates.THB]},
                                        else: "$totalAmount"
                                    }
                                }
                            }
                        }
                    },
                    chartAccountDoc: {$last: '$chartAccountDoc'}
                }
            },
            {
                $sort: {"chartAccountDoc.name": 1}
            },
            {
                $group: {
                    _id: "$chartAccountDoc.cashType",
                    subTotal: {$sum: "$totalAmount"},
                    dataDoc: {$addToSet: "$$ROOT"}
                }
            },
            {
                $sort: {_id: -1}
            },
            {
                $group: {
                    _id: null,
                    dataItems: {$addToSet: "$$ROOT"},
                    dataSubTotal: {$addToSet: "$subTotal"}
                }
            }
        ]);

        if (transaction.length > 0) {
            if (transaction[0].dataItems.length > 0) {
                content = transaction[0].dataItems;
                data.footer = {
                    totalUsd: transaction[0].dataSubTotal[0] - transaction[0].dataSubTotal[1]
                };
            }
        }

        if (content.length > 0) {
            data.content = content;
        }

        return data;
    },
    dental_cashFlowReport: function (params) {
        this.unblock();

        var data = {
            title: {},
            header: {},
            content: {},
            footer: {},
            sign: {}
        };

        var repDate = params.repDate.split(" - ");
        var fDate = moment(repDate[0], "MM/DD/YYYY").startOf('day').toDate();
        var tDate = moment(repDate[1], "MM/DD/YYYY").endOf("day").toDate();

        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        var header = {
            repDate: moment(fDate).format('DD/MM/YYYY') + ' - ' + moment(tDate).format('DD/MM/YYYY'),
        };

        // Exchange
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(params.exchange);
        header.exchangeStr = JSON.stringify(exchangeDoc.rates, null, ' ');

        // Branch
        var branchLbl = 'All';
        if (params.branchId != branchLbl) {
            var branchDoc = Cpanel.Collection.Branch.findOne({_id: params.branchId});
            branchLbl = branchDoc._id + " : " + branchDoc.enName;
        }

        header.branch = branchLbl;
        header.currency = params.currencyId ? params.currencyId : 'All';

        data.header = header;

        /****** Content *****/
        var selector = {};

        selector.transactionDate = {
            $gte: fDate,
            $lte: tDate
        };
        if (params.branchId != "All") selector.cpanel_branchId = params.branchId;
        if (params.currencyId != "All") selector.currencyId = params.currencyId;

        var transaction = Dental.Collection.CashTransaction.aggregate([
            {$unwind: '$items'},
            {
                $group: {
                    _id: {
                        currency: '$currencyId',
                        item: '$items.chartAccountId',
                        day: {$dayOfMonth: "$transactionDate"},
                        month: {$month: "$transactionDate"},
                        year: {$year: "$transactionDate"}
                    },
                    transactionDate: {$last: "$transactionDate"},
                    totalAmount: {$sum: '$items.amount'},
                    chartAccountDoc: {$last: '$items.chartAccountDoc'}
                }
            },
            {
                $group: {
                    _id: {
                        cashType: "$chartAccountDoc.cashType",
                        day: "$_id.day",
                        month: "$_id.month",
                        year: "$_id.year",
                    },
                    transactionDate: {$last: "$transactionDate"},
                    totalAmount: {
                        $sum: {
                            $cond: {
                                if: {$eq: ["$_id.currency", "KHR"]},
                                then: {$divide: ["$totalAmount", exchangeDoc.rates.KHR]},
                                else: {
                                    $cond: {
                                        if: {$eq: ["$_id.currency", "THB"]},
                                        then: {$divide: ["$totalAmount", exchangeDoc.rates.THB]},
                                        else: "$totalAmount"
                                    }
                                }
                            }
                        }
                    },
                    chartAccountDoc: {$last: '$chartAccountDoc'}
                }
            },
            {
                $sort: {"_id.cashType": 1}
            },
            {
                $group: {
                    _id: {
                        day: "$_id.day",
                        month: "$_id.month",
                        year: "$_id.year"
                    },
                    transactionDate: {$last: "$transactionDate"},
                    doc: {
                        $addToSet: {cashType: "$_id.cashType", amount: "$totalAmount"}
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    transactionDate: 1,
                    doc: 1
                }
            },
            {
                $sort: {transactionDate: 1}
            }
        ]);

        // console.log(transaction);

        var content = [];
        transaction.forEach(function (val) {
            var item = {
                transactionDate: val.transactionDate,
                Opening: 0,
                In: 0,
                Out: 0,
                Closing: 0,
                Balance: 0,
            };

            _.each(val.doc, function (obj) {
                item[obj.cashType] = obj.amount;
            });

            item.Balance = item.Opening + item.In - item.Out - item.Closing;

            // Push content
            content.push(item);
        });

        if (content.length > 0) {
            data.content = content;
        }


        return data;
    },
    dental_cashChartAccountReport: function (params) {
        this.unblock();

        var data = {
            title: {},
            header: {},
            content: {},
            footer: {},
            sign: {}
        };

        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        var header = {};
        header.cashType = params.cashType ? params.cashType : 'All';
        data.header = header;

        /****** Content *****/
        var selector = {};
        if (params.cashType) {
            selector.cashType = params.cashType;
        }

        var content = [];
        var index = 1;
        Dental.Collection.CashChartAccount.find(
            selector,
            {sort: {cashType: 1}}
        ).forEach(function (val) {
            val.index = index;
            content.push(val);
            index++;
        });

        if (content.length > 0) {
            data.content = content;
        }

        return data;
    }
});
