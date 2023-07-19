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
      start: '2023-07-14',
      end: '2023-07-15',
    },
    {
      title: 'Clase 2',
      start: '15:00:00',
      end: '16:00:00',
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
                slotMinTime:"08:00:00",
                slotMaxTime:"23:00:00",
                nowIndicator:true,
                hiddenDays:[0],
                events:{eventos},
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
