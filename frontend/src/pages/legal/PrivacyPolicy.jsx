// src/pages/legal/PrivacyPolicy.jsx
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12 max-w-4xl"
    >
      <h1 className="text-4xl font-bold text-amber-800 text-center mb-8">
        Privacy Policy
      </h1>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          1. Introduction
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Welcome to Prani Seva Ashram's Privacy Policy. This policy explains
          how we collect, use, disclose, and safeguard your information when you
          visit our website, including any other media form, media channel,
          mobile website, or mobile application related or connected thereto
          (collectively, the “Site”). Please read this privacy policy carefully.
          If you do not agree with the terms of this privacy policy, please do
          not access the site.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We reserve the right to make changes to this Privacy Policy at any
          time and for any reason. We will alert you about any changes by
          updating the “Last updated” date of this Privacy Policy. You are
          encouraged to periodically review this Privacy Policy to stay informed
          of updates. You will be deemed to have been made aware of, will be
          subject to, and will be deemed to have accepted the changes in any
          revised Privacy Policy by your continued use of the Site after the
          date such revised Privacy Policy is posted.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          2. Collection of Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          We may collect information about you in a variety of ways. The
          information we may collect on the Site includes:
        </p>
        <h3 className="text-xl font-semibold text-amber-800 mb-2">
          Personal Data
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Demographic and other personally identifiable information (such as
          your name and email address) that you voluntarily give to us when you
          choose to participate in various activities related to the Site, such
          as online chat and message boards. If you choose to share data about
          yourself via your profile, online chat, or other interactive areas of
          the Site, you do so at your own risk.
        </p>
        <h3 className="text-xl font-semibold text-amber-800 mb-2">
          Derivative Data
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Information our servers automatically collect when you access the
          Site, such as your IP address, your browser type, your operating
          system, your access times, and the pages you have viewed directly
          before and after accessing the Site.
        </p>
        <h3 className="text-xl font-semibold text-amber-800 mb-2">
          Financial Data
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Financial information, such as data related to your payment method
          (e.g., valid credit card number, card brand, expiration date) that we
          may collect when you purchase, order, return, exchange, or request
          information about our services from the Site. We store only very
          limited, if any, financial information that we collect. Otherwise, all
          financial information is stored by our payment processor, [Your
          Payment Processor Name, e.g., Stripe, PayPal], and you are encouraged
          to review their privacy policy.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          3. Use of Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          Having accurate information about you permits us to provide you with a
          smooth, efficient, and customized experience. Specifically, we may use
          information collected about you via the Site to:
        </p>
        <ul className="list-disc pl-8 text-gray-700 leading-relaxed">
          <li>Create and manage your account.</li>
          <li>Process donations and other transactions.</li>
          <li>Send you emails regarding your account or order.</li>
          <li>Enable user-to-user communications.</li>
          <li>Request feedback and contact you about your use of the Site.</li>
          <li>Resolve disputes and troubleshoot problems.</li>
          <li>Administer sweepstakes and promotions.</li>
          <li>
            Compile anonymous statistical data and analysis for use internally
            or with third parties.
          </li>
        </ul>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          4. Disclosure of Your Information
        </h2>
        <p className="text-gray-700 leading-relaxed">
          We may share information we have collected about you in certain
          situations. Your information may be disclosed as follows:
        </p>
        <h3 className="text-xl font-semibold text-amber-800 mb-2">
          By Law or to Protect Rights
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          If we believe the release of information about you is necessary to
          respond to legal process, to investigate or remedy potential
          violations of our policies, or to protect the rights, property, or
          safety of others, we may share your information as permitted or
          required by any applicable law, rule, or regulation.
        </p>
        <h3 className="text-xl font-semibold text-amber-800 mb-2">
          Third-Party Service Providers
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          We may share your information with third parties that perform services
          for us or on our behalf, including payment processing, data analysis,
          email delivery, hosting services, customer service, and marketing
          assistance.
        </p>
      </section>

      <section className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-amber-900 mb-4">
          5. Contact Us
        </h2>
        <p className="text-gray-700 leading-relaxed">
          If you have questions or comments about this Privacy Policy, please
          contact us at:
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

export default PrivacyPolicy;
