Dental.ListForReportState = new ReactiveObj();
/************ Form *************/
Template.dental_depositListReport.onCreated(function () {
    createNewAlertify('exchange');
});

Template.dental_depositListReport.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);
});

Template.dental_depositListReport.events({
    'click .exchangeAddon': function (e, t) {
        alertify.exchange(fa("plus", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
    }
    //,
    //'change .patientId': function (e, t) {
    //    var patientId = $(e.currentTarget).val();
    //    return Dental.ListForReportState.set("patientId", patientId);
    //}

});

/************ Generate *************/
Template.dental_depositListReportGen.helpers({
    data: function () {
        var self = this;
        var data = {
            title: {},
            header: [],
            content: [],
            footer: [],
            deposit: []
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company,
            date: self.date
        };

        /********* Header ********/

        console.log(self.patient);

        var branch;
        var exchangeDoc = Cpanel.Collection.Exchange.findOne(self.exchange);

        if (self.branchId != "") {
            branch = self.branchId;
        } else {
            branch = "All";
        }


        data.header = [
            {col1: 'Branch: ' + branch, col2:'', col3:'Exchange: ' + numeral(exchangeDoc.rates.USD).format('$ 0,0.00') +" | "+ numeral(exchangeDoc.rates.KHR).format('0,0.00')+" R" + " | "+ numeral(exchangeDoc.rates.THB).format('0,0.00')+" B" }
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var selectorExchange = {};

        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.depositDate = {$gte: fromDate, $lte: toDate};
        if (self.branchId != "") selector.branchId = self.branchId;

        // Get Deposit
        var getDeposit = Dental.Collection.Deposit.find(selector);
        //Get Exchange
        var exchange = Cpanel.Collection.Exchange.findOne(selectorExchange);

        var index = 1;

        //Grand Total USD
        var grandTotalUsd = 0;
        //Grand Total KHR
        var grandTotalKhr = 0;

        if (!_.isUndefined(getDeposit)) {
            getDeposit.forEach(function (obj) {
                obj.index = index;
                obj.patient = obj.patientId + " : " + obj._register._patient.name + " (" + obj._register._patient.gender + ")";
                content.push(obj);

                obj.amount = numeral(obj.amount).format('0,0.00');
                //Grand Total USD
                grandTotalUsd += Math.round(obj.amount * exchange.rates.USD);

                //Grand Total KHR
                grandTotalKhr += Math.round(obj.amount * exchange.rates.KHR);

                index += 1;
            });
        }

        content.grandTotalUsd = numeral(grandTotalUsd).format('0,0.00');
        content.grandTotalKhr = numeral(grandTotalKhr).format('0,0.00');

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});