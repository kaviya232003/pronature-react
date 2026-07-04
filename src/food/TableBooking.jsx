import React, { useState, useEffect } from 'react';
import styles from './TableBooking.module.css';

const TABLES = [
  { id: 1, name: 'Table 1', seats: 2, position: { top: '10%', left: '10%' } },
  { id: 2, name: 'Table 2', seats: 2, position: { top: '10%', left: '40%' } },
  { id: 3, name: 'Table 3', seats: 4, position: { top: '10%', left: '70%' } },
  { id: 4, name: 'Table 4', seats: 4, position: { top: '45%', left: '10%' } },
  { id: 5, name: 'Table 5', seats: 6, position: { top: '45%', left: '40%' } },
  { id: 6, name: 'Table 6', seats: 6, position: { top: '45%', left: '70%' } },
  { id: 7, name: 'Table 7', seats: 8, position: { top: '75%', left: '10%' } },
  { id: 8, name: 'Table 8', seats: 8, position: { top: '75%', left: '70%' } },
];

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM',
  '03:00 PM', '04:00 PM', '05:00 PM',
  '06:00 PM', '07:00 PM', '08:00 PM',
  '09:00 PM', '10:00 PM', '11:00 PM',
];

export default function TableBooking() {
  const [bookings, setBookings] = useState({}); // { "tableId-date-time": bookingInfo }
  const [selectedTable, setSelectedTable] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', guests: 1 });
  const [filterDate, setFilterDate] = useState('');
  const [filterTime, setFilterTime] = useState('');

  // Auto-release expired bookings every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setBookings(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(key => {
          const booking = updated[key];
          const bookingEnd = new Date(`${booking.date} ${booking.time}`);
          bookingEnd.setHours(bookingEnd.getHours() + 1);
          if (now > bookingEnd) {
            delete updated[key];
          }
        });
        return updated;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toISOString().split('T')[0];

  const getBookingKey = (tableId, date, time) => `${tableId}-${date}-${time}`;

  const isTableBooked = (tableId, date, time) => {
    if (!date || !time) return false;
    return !!bookings[getBookingKey(tableId, date, time)];
  };

  const getTableStatus = (table) => {
    if (!filterDate || !filterTime) return 'available';
    return isTableBooked(table.id, filterDate, filterTime) ? 'booked' : 'available';
  };

  const handleTableClick = (table) => {
    if (getTableStatus(table) === 'booked') return;
    setSelectedTable(table);
    setSelectedDate(filterDate || today);
    setSelectedTime(filterTime || '');
    setForm({ name: '', phone: '', guests: 1 });
    setShowModal(true);
  };

const handleBook = async () => {
  if (!form.name || !form.phone || !selectedDate || !selectedTime) return;

  try {
    await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tableId: selectedTable.id,
        tableName: selectedTable.name,
        date: selectedDate,
        time: selectedTime,
        ...form,
      }),
    });
  } catch (err) {
    console.error('Failed to save booking:', err);
  }

  const key = getBookingKey(selectedTable.id, selectedDate, selectedTime);
  setBookings(prev => ({
    ...prev,
    [key]: {
      tableId: selectedTable.id,
      tableName: selectedTable.name,
      date: selectedDate,
      time: selectedTime,
      ...form,
    }
  }));
  setShowModal(false);
  setShowSuccess(true);
  setTimeout(() => setShowSuccess(false), 3000);
};

  const handleCancel = (key) => {
    setBookings(prev => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  const myBookings = Object.entries(bookings);

  return (
    <section className={styles.section} id="booking">

      {/* Header */}
      <div className={styles.header}>
        <span className={styles.label}>Reserve a Spot</span>
        <h2 className={styles.title}>Book Your <span className={styles.green}>Table</span></h2>
        <p className={styles.subtitle}>Pick a date and time, choose your table, and we'll have it ready for you.</p>
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>📅 Date</label>
          <input
            type="date"
            className={styles.filterInput}
            min={today}
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>🕐 Time</label>
          <select
            className={styles.filterInput}
            value={filterTime}
            onChange={e => setFilterTime(e.target.value)}
          >
            <option value="">Select time</option>
            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className={styles.legend}>
          <span className={styles.legendItem}><span className={styles.dotAvail} /> Available</span>
          <span className={styles.legendItem}><span className={styles.dotBooked} /> Booked</span>
        </div>
      </div>

      {/* Restaurant floor map */}
      <div className={styles.floorWrap}>
        <div className={styles.floorLabel}>🍽️ Restaurant Floor</div>
        <div className={styles.floor}>
          {/* Decorative elements */}
          <div className={styles.window} style={{ top: '2%', left: '20%' }} />
          <div className={styles.window} style={{ top: '2%', left: '50%' }} />
          <div className={styles.window} style={{ top: '2%', left: '80%' }} />
          <div className={styles.entrance}>🚪 Entrance</div>

          {TABLES.map(table => {
            const status = getTableStatus(table);
            return (
              <button
                key={table.id}
                className={`${styles.table} ${styles[status]}`}
                style={table.position}
                onClick={() => handleTableClick(table)}
                disabled={status === 'booked'}
              >
                <span className={styles.tableIcon}>🪑</span>
                <span className={styles.tableName}>{table.name}</span>
                <span className={styles.tableSeats}>{table.seats} seats</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* My bookings */}
      {myBookings.length > 0 && (
        <div className={styles.myBookings}>
          <h3 className={styles.myBookingsTitle}>Your Reservations</h3>
          <div className={styles.bookingList}>
            {myBookings.map(([key, b]) => (
              <div key={key} className={styles.bookingCard}>
                <div className={styles.bookingInfo}>
                  <span className={styles.bookingTable}>🪑 {b.tableName}</span>
                  <span className={styles.bookingDetail}>👤 {b.name} · {b.guests} guest{b.guests > 1 ? 's' : ''}</span>
                  <span className={styles.bookingDetail}>📅 {b.date} · 🕐 {b.time}</span>
                  <span className={styles.bookingDetail}>📞 {b.phone}</span>
                </div>
                <button className={styles.cancelBtn} onClick={() => handleCancel(key)}>Cancel</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Booking modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>✕</button>
            <h3 className={styles.modalTitle}>Book {selectedTable?.name}</h3>
            <p className={styles.modalSub}>{selectedTable?.seats} seats available</p>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Your Name</label>
              <input
                className={styles.formInput}
                placeholder="Enter your name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Phone Number</label>
              <input
                className={styles.formInput}
                placeholder="+1 000 000 0000"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date</label>
                <input
                  type="date"
                  className={styles.formInput}
                  min={today}
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Time</label>
                <select
                  className={styles.formInput}
                  value={selectedTime}
                  onChange={e => setSelectedTime(e.target.value)}
                >
                  <option value="">Select time</option>
                  {TIME_SLOTS.map(t => (
                    <option
                      key={t}
                      value={t}
                      disabled={isTableBooked(selectedTable?.id, selectedDate, t)}
                    >
                      {t} {isTableBooked(selectedTable?.id, selectedDate, t) ? '(Booked)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Number of Guests</label>
              <select
                className={styles.formInput}
                value={form.guests}
                onChange={e => setForm({ ...form, guests: Number(e.target.value) })}
              >
                {Array.from({ length: selectedTable?.seats || 1 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n} guest{n > 1 ? 's' : ''}</option>
                ))}
              </select>
            </div>

            <button
              className={styles.bookBtn}
              onClick={handleBook}
              disabled={!form.name || !form.phone || !selectedDate || !selectedTime}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      )}

      {/* Success toast */}
      {showSuccess && (
        <div className={styles.toast}>
          ✅ Table booked successfully! See you soon.
        </div>
      )}

    </section>
  );
}