'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import './career.css';
import {
  FaChartLine,
  FaHandshake,
  FaUserTie,
  FaGlobe,
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaFileUpload
} from 'react-icons/fa';

const Careers = () => {
  const [activeTab, setActiveTab] = useState('why-ario');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    message: '',
    resume: null
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        resume: file
      }));
      
      // Clear error if any
      if (formErrors.resume) {
        setFormErrors(prev => ({
          ...prev,
          resume: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.position.trim()) errors.position = 'Position is required';
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (!formData.resume) errors.resume = 'Resume is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // Create FormData object to send file
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('message', formData.message || '');
      formDataToSend.append('resume', formData.resume);
      
      // Send to your backend API
     const response = await fetch("/api/contact-career", {
  method: "POST",
  body: formDataToSend,
});

      
      if (response.ok) {
        const result = await response.json();
        
        if (result.success) {
          setSubmitStatus('success');
          
          // Reset form
          setFormData({
            name: '',
            email: '',
            phone: '',
            position: '',
            experience: '',
            message: '',
            resume: null
          });
          
          // Reset file input
          const fileInput = document.getElementById('resume');
          if (fileInput) fileInput.value = '';
        } else {
          throw new Error(result.message || 'Failed to submit application');
        }
      } else {
        throw new Error(`Server returned ${response.status}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <motion.section 
        className="hero-section relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-image-container">
          <Image
            src="/career/bg.png"
            alt="Ario Shipping Careers"
            fill
            priority
            className="hero-image"
          /> 
        </div>
        
        <div className="hero-content px-6 py-12 md:py-24">
        </div>
      </motion.section>

      {/* Intro Section */}
      <motion.section 
        className="intro-section py-16 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#003980] mb-8"
            variants={fadeIn}
          >
            Navigate Your Future at Ario Shipping
          </motion.h2>
          <div className="grid text-center md:gap-16">
            <motion.p 
              className="text-lg  md:text-xl text-gray-700 leading-relaxed"
              variants={fadeIn}
            >
              As a fast-growing name in global shipping and logistics, we're looking for passionate, innovative individuals ready to take on challenges and grow with us.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* Main Content Tabs */}
      <section className="main-content py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="tabs-header flex justify-center space-x-4 mb-12">
            <button 
              className={`tab-btn px-6 py-3 text-lg font-medium rounded-lg transition-colors ${activeTab === 'why-ario' ? 'active bg-[#003980] text-white' : 'bg-white text-[#003980] hover:bg-gray-100'}`}
              onClick={() => setActiveTab('why-ario')}
            >
              Why Ario?
            </button>
            <button 
              className={`tab-btn px-6 py-3 text-lg font-medium rounded-lg transition-colors ${activeTab === 'apply-now' ? 'active bg-[#003980] text-white' : 'bg-white text-[#003980] hover:bg-gray-100'}`}
              onClick={() => setActiveTab('apply-now')}
            >
              Apply Now
            </button>
          </div>

          <div className="tab-content bg-white rounded-xl shadow-md p-8">
            {activeTab === 'why-ario' && (
              <motion.div 
                className="why-ario-content grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                {/* First three cards in normal positions */}
                {[
                  {
                    icon: <FaChartLine className="icon" />,
                    title: "Professional Growth",
                    desc: "Gain hands-on experience with global logistics operations, cross-border trade solutions, and client management that accelerates your development."
                  },
                  {
                    icon: <FaHandshake className="icon" />,
                    title: "Inclusive Culture",
                    desc: "Our culture of respect, collaboration, and diversity encourages every team member to share ideas and contribute meaningfully."
                  },
                  {
                    icon: <FaUserTie className="icon" />,
                    title: "Leadership & Mentorship",
                    desc: "Learn from industry leaders through strategic mentorship and knowledge-sharing that prepares you for long-term success."
                  }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="benefit-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <div className="benefit-icon text-[#003980] text-3xl mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-[#003980]">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </motion.div>
                ))}

                {/* Last two cards - centered together */}
                <motion.div 
                  className="grid md:grid-cols-2 gap-6 md:col-span-2 lg:col-span-3 lg:mx-auto lg:w-2/3 rounded-lg overflow-hidden"
                >
                  {/* Card 1 - Global */}
                  <motion.div
                    className="benefit-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <FaGlobe className="icon text-[#003980] text-3xl mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-[#003980]">Global Footprint</h3>
                    <p className="text-gray-600">With operations across India and upcoming global expansions...</p>
                  </motion.div>

                  {/* Card 2 - Employee */}
                  <motion.div
                    className="benefit-card p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all"
                    variants={fadeIn}
                    whileHover={{ y: -5 }}
                  >
                    <FaHeart className="icon text-[#003980] text-3xl mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-[#003980]">Employee-Centric</h3>
                    <p className="text-gray-600">Competitive compensation, performance rewards...</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'apply-now' && (
              <motion.div 
                className="apply-content"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
              >
                <motion.h3 
                  className="text-2xl md:text-3xl font-bold text-[#003980] mb-8 text-center"
                  variants={fadeIn}
                >
                  Join Our Team
                </motion.h3>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Application submitted successfully! We'll be in touch soon.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    There was an error submitting your application. Please try again.
                  </div>
                )}
                
                <motion.form 
                  onSubmit={handleSubmit}
                  variants={fadeIn}
                  className="max-w-3xl mx-auto"
                >
                  <div className="form-grid grid md:grid-cols-2 gap-6 mb-8">
                    <div className="form-group">
                      <label htmlFor="name" className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name}
                        onChange={handleInputChange}
                        required 
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="email" className="block text-gray-700 mb-2 font-medium">Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        required 
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your.email@example.com"
                      />
                      {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone" className="block text-gray-700 mb-2 font-medium">Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone}
                        onChange={handleInputChange}
                        required 
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+91 9876543210"
                      />
                      {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="position" className="block text-gray-700 mb-2 font-medium">Position *</label>
                      <input 
                        type="text" 
                        id="position" 
                        name="position" 
                        value={formData.position}
                        onChange={handleInputChange}
                        required 
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.position ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Which position are you applying for?"
                      />
                      {formErrors.position && <p className="text-red-500 text-sm mt-1">{formErrors.position}</p>}
                    </div>
                    
                    <div className="form-group md:col-span-2">
                      <label htmlFor="experience" className="block text-gray-700 mb-2 font-medium">Experience *</label>
                      <input 
                        type="text" 
                        id="experience" 
                        name="experience" 
                        value={formData.experience}
                        onChange={handleInputChange}
                        required 
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          formErrors.experience ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Years of relevant experience"
                      />
                      {formErrors.experience && <p className="text-red-500 text-sm mt-1">{formErrors.experience}</p>}
                    </div>
                    
                    <div className="form-group md:col-span-2">
                      <label htmlFor="message" className="block text-gray-700 mb-2 font-medium">Message (Optional)</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us why you're interested in joining Ario Shipping..."
                      />
                    </div>
                    
                    <div className="form-group file-upload md:col-span-2 relative">
                      <label htmlFor="resume" className="block text-gray-700 mb-2 font-medium">Resume/CV *</label>
                      <div className={`upload-box border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        formErrors.resume ? 'border-red-500' : 'border-gray-300 hover:border-blue-500'
                      }`}>
                        <input 
                          type="file" 
                          id="resume" 
                          name="resume" 
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          required 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                          <FaFileUpload className="text-3xl text-[#003980]" />
                          <span className="text-gray-600">
                            {formData.resume ? formData.resume.name : "Drag & drop your resume or click to browse"}
                          </span>
                          <span className="text-sm text-gray-500">PDF or Word documents only (Max 5MB)</span>
                        </div>
                      </div>
                      {formErrors.resume && <p className="text-red-500 text-sm mt-1">{formErrors.resume}</p>}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <motion.button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="submit-btn bg-[#003980] hover:bg-[#002a5d] text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </motion.button>
                  </div>
                </motion.form>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;