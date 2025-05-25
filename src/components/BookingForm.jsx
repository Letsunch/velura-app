import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BookingScreen() {
  const { state } = useLocation();
  const stylist = state?.stylist;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // You could send this data to Firebase here
    console.log({ ...formData, stylist });

    navigate('/confirmation', { state: { ...formData, stylist } });
  };

  if (!stylist) {
    return <div className="booking-container">No stylist selected.</div>;
  }

  return (
    <>
      <style>{`
        .booking-container {
          max-width: 600px;
          margin: 50px auto;
          background: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          font-family: 'Inter', sans-serif;
        }

        .booking-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: #1B1F3B;
          margin-bottom: 30px;
          text-align: center;
        }

        .booking-form label {
          display: block;
          margin-bottom: 20px;
          font-size: 14px;
          color: #1B1F3B;
        }

        .booking-form input,
        .booking-form select {
          width: 100%;
          padding: 12px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 12px;
          font-size: 16px;
          background-color: #F9F9F9;
        }

        .submit-button {
          background-color: #1B1F3B;
          color: white;
          border: none;
          padding: 15px 30px;
          border-radius: 30px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 20px;
          width: 100%;
          transition: background 0.3s ease;
        }

        .submit-button:hover {
          background-color: #405DE6;
        }
      `}</style>

      <div className="booking-container">
        <h2 className="booking-title">Book with {stylist.name}</h2>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Your Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email Address
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Preferred Date
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Time Slot
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            >
              <option value="">Select time</option>
              <option value="09:00">09:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="13:00">01:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="17:00">05:00 PM</option>
            </select>
          </label>

          <button type="submit" className="submit-button">
            Confirm Booking
          </button>
        </form>
      </div>
    </>
  );
}
