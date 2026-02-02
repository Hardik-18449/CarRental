import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Your message has been submitted successfully!");
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p>
            Facing an issue with booking, payment, or vehicles?  
            Fill out the form and our support team will reach out to you shortly.
          </p>

          <div className="contact-details">
            <p><strong>Email:</strong> support@carrental.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Working Hours:</strong> 24/7 Support</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Raise an Issue</h3>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <select
            name="issue"
            value={formData.issue}
            onChange={handleChange}
            required
          >
            <option value="">Select Issue Type</option>
            <option value="Booking Issue">Booking Issue</option>
            <option value="Payment Problem">Payment Problem</option>
            <option value="Vehicle Issue">Vehicle Issue</option>
            <option value="Account Issue">Account Issue</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="message"
            placeholder="Describe your issue..."
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit Issue</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
