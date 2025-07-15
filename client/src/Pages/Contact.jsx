import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaGlobe, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Contact() {
  return (
    <div className="min-h-screen bg-gray-500 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg p-8 grid md:grid-cols-2 gap-8">
        {/* Left Column - Contact Info */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            Reach out to us via any of the communication channels below.
          </p>

          <div className="flex items-center gap-4 text-gray-700">
            <FaEnvelope className="text-xl text-amber-600" />
            <span>hello@furniq.com</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FaPhone className="text-xl text-amber-600" />
            <span>+254 712 345 678</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FaMapMarkerAlt className="text-xl text-amber-600" />
            <span>Westlands, Nairobi, Kenya</span>
          </div>

          <div className="flex items-center gap-4 text-gray-700">
            <FaGlobe className="text-xl text-amber-600" />
            <span>www.furniq.com</span>
          </div>
        </div>

        {/* Right Column - Socials */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Follow Us</h2>
          <p className="text-gray-600">
            Stay connected with us on social media.
          </p>

          <div className="flex gap-6 text-2xl text-amber-600">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="hover:text-gray-800 transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-gray-800 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="hover:text-gray-800 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-gray-800 transition" />
            </a>
          </div>

          {/* Optional Contact Form Placeholder */}
          <div className="mt-8">
            <p className="text-gray-400 text-sm italic">
              Want to send us a message directly? Chat or email us — we respond within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
