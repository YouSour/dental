Router.route('dental/appointmentListReport', function() {
  this.render('dental_appointmentListReport');
}, {
  name: 'dental.appointmentListReport',
  title: "Appointment List Report",
  header: {
    title: 'Appointment Report',
    sub: '',
    icon: 'file-text-o'
  },
  breadcrumb: {
    title: 'Appointment Report',
    parent: 'dental.home'
  }
});

Router.route('dental/appointmentListReportGen', function() {
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
  this.render('dental_appointmentListReportGen', {
    data: function() {
      return q;
    }
  });
});
