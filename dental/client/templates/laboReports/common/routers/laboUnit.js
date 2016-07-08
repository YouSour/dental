Router.route('dental/laboUnit', function() {
  this.render('dental_laboUnit');
}, {
  name: 'dental.laboUnit',
  title: 'Laboratory Unit',
  header: {
    title: 'Laboratory Unit',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Unit',
    parent: 'dental.home'
  }
});
