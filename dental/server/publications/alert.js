Meteor.publish('alertCalendarEvent', function () {
     var currentDate = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');
     var doc = Dental.Collection.CalendarEvent.find({start: {$lt: currentDate}, status: 'Enable'});
     Counts.publish(this, 'alertCalendarEvent', doc);

     this.ready();
 });
