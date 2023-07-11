import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import 'bootstrap/dist/css/bootstrap.min.css';

const HorarioComponente = () => {
  // Datos de ejemplo para el horario
  const eventos = [
    {
      title: 'Clase 1',
      start: '2023-07-05T13:00:00',
      end: '2023-07-05T14:00:00',
      daysOfWeek: [1], // Lunes
    },
    {
      title: 'Clase 2',
      start: '2023-07-05T15:00:00',
      end: '2023-07-05T16:00:00',
      daysOfWeek: [2], // Martes
    },
    // Agrega más eventos según sea necesario
  ];


  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="timeGridHorario"
        height='auto'
        views={{
            timeGridHorario:{
                type:'timeGridWeek',
                allDaySlot:false,
                slotMinTime:"10:00:00",
                slotMaxTime:"22:00:00",
                nowIndicator:true,
                hiddenDays:[0],
            }
        }}
        headerToolbar={{
          left: 'prev, next, today',
          center: 'title',
          right: 'timeGridHorario, timeGridMonth',
        }}
      />
    </div>
  );
};

export default HorarioComponente;
