Dental.TabularTable.Doctor = new Tabular.Table({
    name: "dentalDoctorList",
    collection: Dental.Collection.Doctor,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_doctorAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "startDate", title: "Start Date"},
        {data: "address", title: "Address"},
        {data: "telephone", title: "Telephone"},
        {
            data: "photo",
            title: "Photo",
            render: function (val, type, doc) {
                if (_.isUndefined(val)) {
                    return null;
                } else {
                    var img = Files.findOne(val);
                    return lightbox(img.url(), doc._id, doc.name);
                }
            }
        },
        {data: "_treatmentCount", title: "Treatment+"}
    ],
    order: [['1', 'desc']],
    extraFields:["des"],
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
