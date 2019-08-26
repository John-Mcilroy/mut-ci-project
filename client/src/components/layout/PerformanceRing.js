import React, { useState } from 'react';

const PerformanceRing = ({ performance = "Error" }) => {
  const [radius] = useState("53");
  const [stroke] = useState("13");

  let currentPerformance;
  if (performance === "Error") {
    currentPerformance = "100";
  } else {
    currentPerformance = performance;
  }

  let performanceInt = parseInt(performance);

  if (performanceInt > 100) currentPerformance = "100";
  if (performanceInt <= 0) currentPerformance = "0";

  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - currentPerformance / 100 * circumference;

  return (
    <svg height={radius * 1.3} width={radius * 1.3}>
      <circle
        className="circle"
        style={{ stroke: "grey", opacity: ".4" }}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        r={normalizedRadius}
        cx={radius / 1.5}
        cy={radius / 1.5}
      />
      <circle
        className="circle"
        stroke={
          performance === "Error"
            ? "black"
            : currentPerformance >= 90
              ? "green"
              : currentPerformance >= 80 ? "orange" : "red"
        }
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius / 1.5}
        cy={radius / 1.5}
      />
      <text x="50%" y="50%" textAnchor="middle" stroke="black" dy=".3em">
        {performance !== "Error" ? performance + "%" : "Error"}
      </text>
      )
    </svg>
  );
};

export default PerformanceRing;