Meteor.methods({
    dental_quotation: function (params) {
        var self = params;
        var data = {
            title: {},
            header: {},
            content: [],
            footer: {}
        };

        /********* Title *********/
        var company = Cpanel.Collection.Company.findOne();
        data.title = {
            company: company
        };

        /********* Header ********/
        var quotationDoc = Dental.Collection.Quotation.findOne(self.quotation);
        data.header = quotationDoc;

        /********** Content & Footer **********/
        var content = [];

        // Each item
        var index = 1;
        _.each(quotationDoc.disease, function (obj) {
            var itemDoc = Dental.Collection.DiseaseItem.findOne(obj.item);
            obj.index = index;
            obj.itemName = itemDoc.name;
            obj.price = numeral(obj.price).format('0,0.00');
            obj.amount = numeral(obj.amount).format('0,0.00');

            content.push(obj);

            index += 1;
        });

        data.footer.subtotal = numeral(quotationDoc.subtotal).format('0,0.00');
        data.footer.subDiscount = numeral(quotationDoc.subDiscount).format('0,0.00');
        data.footer.total = numeral(quotationDoc.total).format('0,0.00');

        if (content.length > 0) {
            data.content = content;

            return data;
        } else {
            data.content.push({index: 'no results'});
            return data;
        }
    }
});