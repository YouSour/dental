Dental.TabularTable.Quotation = new Tabular.Table({
    name: "dentalQuotationList",
    collection: Dental.Collection.Quotation,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_quotationAction},
        {data: "_id", title: "ID"},
        {data: "quotationDate", title: "Quotation Date"},
        {
            data: "disease", title: "Disease",
            render: function (val, type, doc) {
                return JSON.stringify(val).slice(1, JSON.stringify(val).length - 1);
            }
        },
        {
            data: "total",
            title: "Total",
            render: function (val, doc, type) {
                return numeral(val).format('0,0.00');
            }
        },
        {data: "patientId", title: "Patient ID"},
        {data: "_patient.name", title: "Patient Name"},
        {
            data: "_patient.photo",
            title: "Photo",
            render: function (val, type, doc) {
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var img = Files.findOne(val);
                    return lightbox(img.url(), doc._id, doc._patient.name);
                }
            }
        }
    ],
    order: [['1', 'desc']],
    autoWidth: false,
    extraFields:["disease","subtotal","subDiscount","des"],
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "12px", "targets": 1}
    ]
});
