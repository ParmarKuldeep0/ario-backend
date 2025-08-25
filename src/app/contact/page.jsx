'use client'
import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaExternalLinkAlt } from 'react-icons/fa';

const ContactSection = () => {
  const officeLocation = {
    name: "Ario Shipping Office",
    address: `Office# 805, 8th floor,Plan S Business Park, Plot No.: D 108/1, Shiravane MIDC,Nerul, Navi Mumbai - 400 706`,
    coordinates: { 
      lat: 19.033989, 
      lng: 73.016119 
    },
    phone: "+91 2244500487",
    email: "info@arioshipping.com",
    zoom: 17
  };

  const openStreetMapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${officeLocation.coordinates.lng - 0.01}%2C${officeLocation.coordinates.lat - 0.01}%2C${officeLocation.coordinates.lng + 0.01}%2C${officeLocation.coordinates.lat + 0.01}&layer=mapnik&marker=${officeLocation.coordinates.lat}%2C${officeLocation.coordinates.lng}`;
  const openStreetMapLink = `https://www.openstreetmap.org/?mlat=${officeLocation.coordinates.lat}&mlon=${officeLocation.coordinates.lng}#map=${officeLocation.zoom}/${officeLocation.coordinates.lat}/${officeLocation.coordinates.lng}`;

  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ 
    message: '', 
    isError: false 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  console.log("API URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus({ message: '', isError: false });

  try {
    const response = await fetch(
      `/api/contact-career`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (data.success) {
      setSubmitStatus({ 
        message: 'Message sent successfully! We will get back to you soon.', 
        isError: false 
      });
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } else {
      setSubmitStatus({ 
        message: data.message || 'Failed to send message. Please try again.', 
        isError: true 
      });
    }
  } catch (error) {
    console.error(error);
    setSubmitStatus({ 
      message: 'Network error. Please check your connection and try again.', 
      isError: true 
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <section className="py-8 md:py-16">
      {/* Hero Image */}
      <div className="relative">
        <div 
          className="hero-image h-[90vh] sm:h-[70vh] md:h-[80vh] lg:h-[70vh] flex items-center justify-center"
          style={{
            backgroundImage: "url('/Newfolder/contact.png')",
            backgroundSize: 'cover',
            backgroundPosition: isMobile ? 'center 30%' : 'center center',
            backgroundRepeat: 'no-repeat',
            clipPath: isMobile ? 'ellipse(120% 50% at 50% 35%)' : 'ellipse(90% 60% at 50% 35%)',
            marginTop: isMobile ? '-90px' : '-70px',
            filter: 'brightness(0.95) contrast(1.1) saturate(1.1)'
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white px-4 relative z-10">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 drop-shadow-lg">
                Contact Us
              </h1>
              <p className="text-base sm:text-lg md:text-xl drop-shadow-md">
                We're here to help!
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* Contact Section Content */}
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl mt-8 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Left Column - Contact Form */}
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#003980] mb-4 sm:mb-6">
              Get In Touch
            </h3>
            <form className="space-y-3 sm:space-y-4 flex-1 flex flex-col" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-700 text-sm sm:text-base mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm sm:text-base mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 text-sm sm:text-base mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label htmlFor="message" className="block text-gray-700 text-sm sm:text-base mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                  required
                ></textarea>
              </div>
              
              {/* Status message */}
              {submitStatus.message && (
                <div className={`text-sm ${submitStatus.isError ? 'text-red-600' : 'text-green-600'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#003980] hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 sm:py-3 px-4 rounded-md transition duration-300 text-sm sm:text-base mt-auto"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right Column - Contact Info & Map */}
          <div className="space-y-6 md:space-y-8">
            {/* Contact Info Card */}
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
              <h3 className="text-xl sm:text-2xl font-semibold text-[#003980] mb-3 sm:mb-4 flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                Our Office Location
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-[#003980] mt-1 mr-2 sm:mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-gray-700 text-sm sm:text-base whitespace-sm:nowrap">
                      {officeLocation.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-[#003980] mr-2 sm:mr-3 transform scale-x-[-1]" />
                  <p className="text-gray-700 text-sm sm:text-base">{officeLocation.phone}</p>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-[#003980] mr-2 sm:mr-3" />
                  <p className="text-gray-700 text-sm sm:text-base">{officeLocation.email}</p>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-2 sm:p-3 bg-gray-50 border-b">
                <h4 className="font-medium text-gray-700 text-sm sm:text-base flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  Find Us on Map
                </h4>
              </div>
              <div className="relative h-64 sm:h-80 md:h-96">
                <iframe
                  title="Ario Shipping Office Location"
                  src={openStreetMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  className="absolute inset-0"
                />
                <div className="absolute bottom-2 sm:bottom-4 left-0 right-0 text-center">
                  <a
                    href={openStreetMapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-white hover:bg-gray-50 text-blue-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-2 rounded shadow-sm border border-gray-300"
                  >
                    <FaExternalLinkAlt className="inline mr-1" />
                    Open Full Screen Map
                  </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;