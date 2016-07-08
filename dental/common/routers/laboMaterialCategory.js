Router.route('dental/laboMaterialCategories', function() {
  this.render('dental_laboMaterialCategory');
}, {
  name: 'dental.laboMaterialCategories',
  title: 'Laboratory Material Categories',
  header: {
    title: 'Laboratory Material Categories',
    sub: '',
    icon: 'list'
  },
  breadcrumb: {
    title: 'Laboratory Material Categories',
    parent: 'dental.home'
  }
});
