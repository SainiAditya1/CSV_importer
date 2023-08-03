import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import emailjs from "emailjs-com";

function ChartAndEmail() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = () => {
    const chartImage = document.querySelector("#chart").toDataURL("image/png");

    const params = {
      to_email: email,
      chart_image: chartImage,
    };

    emailjs
      .send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        params,
        "YOUR_USER_ID"
      )
      .then(
        (result) => {
          console.log("Email sent successfully", result.text);
        },
        (error) => {
          console.error("Email sending failed", error.text);
        }
      );
  };

  // Replace with actual data
  const chartData = {
    labels: ["Label 1", "Label 2", "Label 3"],
    datasets: [
      {
        label: "Data",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        data: [10, 20, 30],
      },
    ],
  };

  return (
    <div>
      <Bar
        id="chart"
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
      
      <Pie
        id="chart"
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={sendEmail}>Send Email</button>
    </div>
  );
}

export default ChartAndEmail;
