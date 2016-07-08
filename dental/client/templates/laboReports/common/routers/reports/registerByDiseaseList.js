Router.route('dental/registerByDiseaseListReport', function() {
  this.render('dental_registerByDiseaseListReport');
}, {
  name: 'dental.registerByDiseaseListReport',
  title: "Register By Disease List Report",
  header: {
    title: 'Register By Disease Report',
    sub: '',
    icon: 'file-text-o'
  },
  breadcrumb: {
    title: 'Register By Disease Report',
    parent: 'dental.home'
  }
});

Router.route('dental/registerByDiseaseListReportGen', function() {
  // Config layout
  this.layout('reportLayout', {
    // Page size: a4, a5, mini
    // Orientation: portrait, landscape
    // Font size: fontBody: undefined (10px), bg (12px)
    data: {
      pageSize: 'a4',
      orientation: 'landscape',
      fontBody: 'bg'
    }
  });

  var q = this.params.query;
  this.render('dental_registerByDiseaseListReportGen', {
    data: function() {
      return q;
    }
  });
});
