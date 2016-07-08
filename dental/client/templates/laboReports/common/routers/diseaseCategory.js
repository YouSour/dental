Router.route('dental/diseaseCategory', function () {

    this.render('dental_diseaseCategory');

}, {
    name: 'dental.diseaseCategory',
    title: "Disease Category",
    header: {title: 'Disease Category', sub: '', icon: 'list'},
    breadcrumb: {title: 'Disease Category', parent: 'dental.home'}
});