Router.route('dental/calendar', function () {

    this.render('dental_calendar');

}, {
    name: 'dental.calendar',
    title: "Calendar",
    header: {title: 'Calendar', sub: '', icon: 'calendar-o'},
    breadcrumb: {title: 'Calendar', parent: 'dental.home'}
});
