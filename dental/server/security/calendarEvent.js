// Security
Dental.Collection.CalendarEvent.permit(['insert'])
  .dental_ifDataInsert()
  .apply();

Dental.Collection.CalendarEvent.permit(['update'])
  .dental_ifDataUpdate()
  .apply();

Dental.Collection.CalendarEvent.permit(['remove'])
  .dental_ifDataRemove()
  .apply();
