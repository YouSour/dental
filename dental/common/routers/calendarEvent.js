Router.route('dental/calendarEvent', function () {

    this.render('dental_calendarEvent');

}, {
    name: 'dental.calendarEvent',
    title: "Appointment",
    header: {title: 'Appointment', sub: '', icon: 'fa fa-clock-o'},
    breadcrumb: {title: 'Appointment', parent: 'dental.register'}
});
