import React, { useState } from 'react';

const PerformanceRing = ({data = 'error'}) => {
  const performance = data.performance || 'error';
  const unitsPerHour = data.unitsPerHour || 0

  const [radius] = useState("53");
  const [stroke] = useState("13");

  let currentPerformance;
  if (performance === "error") {
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
          performance === "error"
            ? null
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
      <text 
        x="50%" 
        y="40%" 
        textAnchor="middle" 
        stroke="black" 
        dy=".25em" 
        fontSize='1em'
      >
        {performance !== "error" ? performance + '%': "No"}
      </text>
      
      <text 
        x="50%" 
        y="60%" 
        textAnchor="middle" 
        stroke="black" 
        dy=".2em" 
        fontSize={performance !== "error" ? ".7em" : "1em"}
      >
        {unitsPerHour !== 0 ? `${unitsPerHour} cph` : performance !== 'error' ? 'No Data' : "Data"}
      </text>
      )
    </svg>
  );
};

export default PerformanceRing;