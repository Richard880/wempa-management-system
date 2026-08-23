// src/components/events/EventCalendar.jsx
import  { useState, useMemo } from "react";
import { Container } from "react-bootstrap";
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import SectionHeading from "../common/SectionHeading";

// 1. Import your dynamic live data stream engine hook
import { useEvents } from "../../features/events/hooks/useEvents";

function EventCalendar() {
  // 2. Fetch live data records stream directly from Firestore
  const { events, loading } = useEvents();

  // 3. Track active display month viewport using native Date hooks
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Format month name header dynamically (e.g. "August 2026")
  const monthLabel = currentDate.toLocaleString("default", { month: "long" });

  // 4. Compute active grid coordinates based on selected year/month variables
  const calendarData = useMemo(() => {
    // Index of the first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDayIndex = new Date(year, month, 1).getDay();
    // Total days inside current viewport month block
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // Group active database event entries matching this month viewport
    const monthlyEventsMap = {};
    events.forEach(event => {
      if (!event.date) return;
      const [eYear, eMonth, eDay] = event.date.split("-").map(Number);
      // Firestore standard month parsing alignment check
      if (eYear === year && eMonth === (month + 1)) {
        if (!monthlyEventsMap[eDay]) monthlyEventsMap[eDay] = [];
        monthlyEventsMap[eDay].push(event);
      }
    });

    return { firstDayIndex, totalDays, monthlyEventsMap };
  }, [events, year, month]);

  // Viewport navigation parameters mutation routines
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  if (loading) return null;

  return (
    <section className="events-calendar-section">
      <Container>
        <SectionHeading
          badge="EVENT CALENDAR"
          title="Upcoming Event Schedule"
          description="Keep track of important WEMPA conferences, workshops, training sessions and networking events."
        />

        <div className="calendar-card bg-dark border border-secondary p-4 rounded-3 shadow">
          {/* Calendar Header with Navigation Controls */}
          <div className="calendar-header d-flex justify-content-between align-items-center mb-4 text-white">
            <div className="d-flex align-items-center gap-2">
              <FaCalendarAlt className="text-primary fs-4" />
              <h3 className="mb-0 fw-bold fs-4">{monthLabel} {year}</h3>
            </div>
            
            <div className="btn-group border border-secondary rounded">
              <button 
                type="button" 
                className="btn btn-dark btn-sm text-white border-0 px-3" 
                onClick={handlePrevMonth}
              >
                <FaChevronLeft size={12} />
              </button>
              <button 
                type="button" 
                className="btn btn-dark btn-sm text-white-50 border-start border-end border-secondary small" 
                onClick={() => setCurrentDate(new Date())}
              >
                Today
              </button>
              <button 
                type="button" 
                className="btn btn-dark btn-sm text-white border-0 px-3" 
                onClick={handleNextMonth}
              >
                <FaChevronRight size={12} />
              </button>
            </div>
          </div>

          <div className="calendar-weekdays mb-2">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          <div className="calendar-grid">
            {/* 5. Pad empty matrix grids before day 1 matching month day offset index */}
            {Array.from({ length: calendarData.firstDayIndex }).map((_, idx) => (
              <div 
                key={`empty-${idx}`} 
                className="calendar-day empty-day opacity-25"
                style={{ minHeight: "65px", backgroundColor: "rgba(255,255,255,0.02)" }}
              />
            ))}

            {/* 6. Render live active days and check for attached event logs */}
            {Array.from({ length: calendarData.totalDays }).map((_, idx) => {
              const currentDayNum = idx + 1;
              const daysEvents = calendarData.monthlyEventsMap[currentDayNum] || [];
              const hasEvents = daysEvents.length > 0;

              return (
                <div
                  key={`day-${currentDayNum}`}
                  className={`calendar-day d-flex flex-column justify-content-between p-2 position-relative ${
                    hasEvents ? "has-event" : ""
                  }`}
                  style={{ minHeight: "65px" }}
                  title={hasEvents ? `${daysEvents.length} Event(s) Scheduled` : ""}
                >
                  <span className="day-number fw-bold text-white-50 small mb-1">
                    {currentDayNum}
                  </span>
                  
                  {/* Inline micro text tag list if event is mapped to this coordinate */}
                  {hasEvents && (
                    <div className="w-100 overflow-hidden text-truncate">
                      {daysEvents.map(e => (
                        <div 
                          key={e.id}
                          className="bg-primary text-white rounded px-1 text-start overflow-hidden text-truncate"
                          style={{ fontSize: "0.6rem", fontWeight: "600", lineHeight: "1.2" }}
                          title={e.title}
                        >
                          {e.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default EventCalendar;
