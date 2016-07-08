Router.route('dental/laboDepartment', function() {
  this.render('dental_laboDepartment');
}, {
  name: 'dental.laboDepartment',
  title: 'Laboratory Department',
  header: {
    title: 'Laboratory Department',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Department',
    parent: 'dental.home'
  }
});
