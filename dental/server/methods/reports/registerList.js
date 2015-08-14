Meteor.methods({
    dental_registerList: function (params) {

        var self = params;
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

        var branch,status;

        var branchDoc = Cpanel.Collection.Branch.findOne({_id: self.branchId});

        if (self.branchId != "") {
            branch = self.branchId + " | " + branchDoc.enName;
        } else {
            branch = "All";
        }

        if (self.status != "") {status = self.status;} else {status = 'All';}

        data.header = [
            {col1: 'Branch: ' + branch ,col2:'Status: ' + status}
        ];

        /********** Content & Footer **********/
        var content = [];

        var selector = {};
        var date = self.date.split(" To ");
        var fromDate = moment(date[0] + " 00:00:00").format("YYYY-MM-DD HH:mm:ss");
        var toDate = moment(date[1] + " 23:59:59").format("YYYY-MM-DD HH:mm:ss");
        if (fromDate != null && toDate != null) selector.registerDate = {$gte: fromDate, $lte: toDate};
        if (self.branchId != "") selector.branchId = self.branchId;
        if (self.status != "") selector.status = self.status;
        // Get register
        var getRegister = Dental.Collection.Register.find(selector);

        var index = 1;

        if (!_.isUndefined(getRegister)) {
            getRegister.forEach(function (obj) {
                obj.index = index;
                obj.patient = obj._patient.name + " (" + obj._patient.gender + ")";

                content.push(obj);

                index += 1;
            });
        }

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});