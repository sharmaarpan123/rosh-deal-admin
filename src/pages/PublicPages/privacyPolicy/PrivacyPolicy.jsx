import React from "react";

const PrivacyPolicy = () => {
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Privacy Policy">
  <title>Privacy Policy - Rosh Deal</title>
  <style>
    :root {
      --theme-color: #5856d6;
    }
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.8;
      margin: 0;
      padding: 0;
      color: #333;
      background-color: #f9f9f9;
    }
    header {
      background-color: var(--theme-color);
      color: white;
      padding: 20px 10px;
      text-align: center;
    }
    header h1 {
      margin: 0;
      font-size: 2.5em;
    }
    header p {
      margin: 0;
      font-size: 1em;
    }
    main {
      max-width: 800px;
      margin: 20px auto;
      background: white;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      padding: 20px;
    }
    section {
      margin-bottom: 20px;
    }
    section h2 {
      border-bottom: 2px solid var(--theme-color);
      display: inline-block;
      padding-bottom: 5px;
      margin-bottom: 10px;
      color: var(--theme-color);
    }
    ul {
      list-style-type: square;
      margin: 0 0 10px 20px;
      padding: 0;
    }
    footer {
      background-color: #f1f1f1;
      padding: 20px 10px;
      text-align: center;
      color: #666;
      border-top: 1px solid #ddd;
    }
    footer p, footer a {
      margin: 5px 0;
      color: #666;
      font-size: 0.9em;
      text-decoration: none;
    }
    footer a:hover {
      text-decoration: underline;
    }
  </style>
  
</head>
<body>
  <header>
    <h1>Privacy Policy</h1>
    <p>Effective Date: <span id="current-year">${year}</span></p>
  </header>
  <main>
    <section>
      <h2>Introduction</h2>
      <p>Welcome to <strong>Rosh Deal</strong>. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.</p>
    </section>
    <section>
      <h2>Information We Collect</h2>
      <ul>
        <li><strong>Personal Information:</strong> Name, email address, phone number, etc.</li>
        <li><strong>Usage Data:</strong> IP address, browser type, pages visited, etc.</li>
        <li><strong>Cookies:</strong> Information stored in browser cookies for site functionality.</li>
      </ul>
    </section>
    <section>
      <h2>How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain our services.</li>
        <li>To personalize user experience.</li>
        <li>To improve our website functionality.</li>
        <li>To communicate with you regarding updates and services.</li>
      </ul>
    </section>
    <section>
      <h2>Sharing Your Information</h2>
      <p>We may share your information with third parties only as necessary to provide services, comply with the law, or protect our rights.</p>
    </section>
    <section>
      <h2>Your Rights</h2>
      <p>You have the right to access, update, delete, or restrict the use of your personal information. Contact us at <a href="mailto:cbreachus@gmail.com">cbreachus@gmail.com</a> for assistance.</p>
    </section>
    <section>
      <h2>Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. The latest version will always be available on this page.</p>
    </section>
  </main>
  <footer>
    <p>&copy; <span id="current-year"></span> Rosh Deal. All Rights Reserved.</p>
    <p>Contact us: <a href="mailto:cbreachus@gmail.com">cbreachus@gmail.com</a></p>
  </footer>
</body>
</html>


`;

  console.log("asdf");
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>;
    </>
  );
};

export default PrivacyPolicy;
