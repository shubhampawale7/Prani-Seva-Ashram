// src/pages/legal/TermsOfService.jsx
import React from "react";
import { motion } from "framer-motion";

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <h1 className="text-4xl font-bold text-amber-800 text-center mb-8">
        Terms of Service
      </h1>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          By accessing or using the Prani Seva Ashram website ("Site"), you
          agree to be bound by these Terms of Service ("Terms") and by our
          Privacy Policy, incorporated herein by reference. If you do not agree
          to these Terms, you may not access or use the Site. These Terms apply
          to all visitors, users, and others who access or use the Site.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          2. Use of the Site
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          You agree to use the Site only for lawful purposes and in a way that
          does not infringe the rights of, restrict or inhibit anyone else's use
          and enjoyment of the Site. Prohibited behavior includes harassing or
          causing distress or inconvenience to any other user, transmitting
          obscene or offensive content, or disrupting the normal flow of
          dialogue within the Site.
        </p>
        <h3 className="text-xl font-semibold text-amber-800 mb-2">Donations</h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Any donations made through the Site are voluntary and non-refundable.
          Prani Seva Ashram is a registered non-profit organization, and all
          donations are used to further our mission of animal welfare, rescue,
          and rehabilitation.
        </p>
        <h3 className="text-xl font-semibold text-amber-800 mb-2">
          Content Accuracy
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          While we strive to provide accurate and up-to-date information on the
          Site, we make no warranties or representations as to the accuracy,
          completeness, or reliability of any content.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          3. Intellectual Property
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          All content on the Site, including text, graphics, logos, images, and
          software, is the property of Prani Seva Ashram or its content
          suppliers and protected by copyright, trademark, and other
          intellectual property laws. You may not reproduce, distribute, modify,
          create derivative works of, publicly display, publicly perform,
          republish, download, store, or transmit any of the material on our
          Site, except as generally permitted under these Terms.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          4. Disclaimers
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          The Site is provided on an "as is" and "as available" basis. Prani
          Seva Ashram makes no representations or warranties of any kind,
          express or implied, as to the operation of the Site or the
          information, content, materials, or products included on the Site. To
          the full extent permissible by applicable law, Prani Seva Ashram
          disclaims all warranties, express or implied, including, but not
          limited to, implied warranties of merchantability and fitness for a
          particular purpose.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          5. Contact Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you have any questions about these Terms of Service, please contact
          us at:
        </p>
        <p className="text-gray-700 leading-relaxed mt-2">
          <strong>Prani Seva Ashram</strong>
          <br />
          <strong>Address</strong> : 135-B, B.A. Chowk, Pune - 411001
          <br />
          <strong>Email</strong> : contact@pranisevaashram.com
          <br />
          <strong>Phone</strong> : +91-9225633029 | +91-9011523456 |
          +91-9011623456 | +91-9822033670
        </p>
      </section>

      <p className="text-sm text-gray-500 text-center mt-12">
        Last updated: May 26, 2025
      </p>
    </motion.div>
  );
};

export default TermsOfService;
