'use client'
import React, { useState } from "react";
import {
  FaPaperPlane,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUser,
  FaCommentAlt,
  FaLinkedinIn,
} from "react-icons/fa";
import "./cta.css";

const ContactCTA = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact-career", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

      if (response.ok) {
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", subject: "", email: "", phone: "", message: "" });
      } else {
        setStatus("Something went wrong ❌");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message ❌");
    }
  };

  return (
    <section className="contact-cta-container">
      <div className="contact-cta-left">
        <div className="section-header">
          <h2>Send Us a Message</h2>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          
          <div className="input-group">
            <span className="input-icon"><FaUser /></span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="contact-input"
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><FaCommentAlt /></span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              required
              className="contact-input"
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><FaEnvelope /></span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="contact-input"
            />
          </div>

          <div className="input-group">
            <span className="input-icon"><FaPhone className="scale-x-[-1]" /></span>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your Phone (Optional)"
              className="contact-input"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
            className="contact-textarea"
            rows="5"
          />

          <button type="submit" className="contact-button">
            <FaPaperPlane className="button-icon" />
            Send Message
          </button>
        </form>

        {status && <p className="form-status">{status}</p>}
      </div>

      <div className="contact-cta-right">
        <div className="section-header">
          <h2>Get in Touch</h2>
        </div>

        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon"><FaEnvelope /></div>
            <div>
              <h3>Email Us</h3>
              <p>info@arioshipping.com</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><FaPhone className="scale-x-[-1]" /></div>
            <div>
              <h3>Call Us</h3>
              <p>+91 2244500487</p>
            </div>
          </div>

          <div className="info-item">
            <div className="info-icon"><FaMapMarkerAlt /></div>
            <div>
              <h3>Visit Us</h3>
              <p>
                Office# 805, 8th floor, Plan S Business Park, Plot No.: D 108/1, Shiravane MIDC, Nerul,<br />
                Navi Mumbai - 400 706
              </p>
            </div>
          </div>
        </div>

        <div className="social-links">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/company/ario-shipping-logistics-private-limited/"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;