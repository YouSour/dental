Router.route('dental/laboMaterial', function() {
  this.render('dental_laboMaterial');
}, {
  name: 'dental.laboMaterial',
  title: 'Laboratory Material',
  header: {
    title: 'Laboratory Material',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Material',
    parent: 'dental.home'
  }
});
