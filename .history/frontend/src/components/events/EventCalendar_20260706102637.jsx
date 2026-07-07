import { Container } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

import SectionHeading from "../ui/SectionHeading";

function EventCalendar() {
  const days = [
    "", 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31,
  ];

  const eventDays = [6, 10, 15, 20];

  return (
    <section className="events-calendar-section">

      <Container>

        <SectionHeading
          badge="EVENT CALENDAR"
          title="Upcoming Event Schedule"
          description="Keep track of important WEMPA conferences, workshops, training sessions and networking events."
        />

        <div className="calendar-card">

          <div className="calendar-header">

            <FaCalendarAlt />

            <h3>August 2026</h3>

          </div>

          <div className="calendar-weekdays">

            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>

          </div>

          <div className="calendar-grid">

            {days.map((day, index) => (

              <div
                key={index}
                className={`calendar-day ${
                  eventDays.includes(day) ? "has-event" : ""
                }`}
              >
                {day}
              </div>

            ))}

          </div>

        </div>

      </Container>

    </section>
  );
}

export default EventCalendar;