Router.route('dental/diseaseItem', function () {

    this.render('dental_diseaseItem');

}, {
    name: 'dental.diseaseItem',
    title: "Disease Item",
    header: {title: 'Disease Item', sub: '', icon: 'list'},
    breadcrumb: {title: 'Disease Item', parent: 'dental.home'}
});