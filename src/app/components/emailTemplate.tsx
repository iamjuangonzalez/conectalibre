import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  apiKey: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  apiKey,
}) => (
  <div style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}>
    <h1>Welcome, {firstName}!</h1>
    <p>
      We are excited to have you on board. Below is your API Key, which you will
      use to access our services:
    </p>
    <div
      style={{
        padding: "10px",
        backgroundColor: "#f4f4f4",
        border: "1px solid #ddd",
      }}
    >
      <strong>Your API Key:</strong>
      <p style={{ fontSize: "1.2em", color: "#333", fontWeight: "bold" }}>
        {apiKey}
      </p>
    </div>
    <p>
      Please make sure to keep your API Key safe and do not share it with
      anyone. If you need to regenerate it, you can do so in your account
      dashboard.
    </p>
    <p>Thank you for choosing our services!</p>
    <p>
      Best regards,
      <br />
      The Team
    </p>
  </div>
);
