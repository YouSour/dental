Dental.TabularTable.Patient = new Tabular.Table({
    name: "dentalPatientList",
    collection: Dental.Collection.Patient,
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.dental_patientAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "gender", title: "Gender"},
        {data: "age", title: "Age"},
        {data: "telephone", title: "Telephone"},
        {data: "member", title: "Member"},
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
        {data: "_registerCount", title: "RG+"}
    ],
    autoWidth: false,
    order: [['1', 'desc']],
    extraFields:['address','history','occupation','des'],
    columnDefs: [
        {"width": "12px", "targets": 0}
    ]
});
