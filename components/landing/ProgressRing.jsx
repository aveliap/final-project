import React from "react";

const ProgressRing = ({ percentage }) => {
  const radius = 50; // Radius of the circle
  const stroke = 10; // Thickness of the circle
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        {/* Background circle (gray ring) */}
        <circle
          stroke="#d1d5db" // Tailwind's gray-300 color
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        {/* Foreground circle (green progress ring) */}
        <circle
          stroke="#0b826c" // Tailwind's green-500 color
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-stroke-dashoffset duration-300"
        />
      </svg>
      {/* Display percentage in the center */}
      <span className="absolute text-lg font-bold text-gray-700">
        {percentage}%
      </span>
    </div>
  );
};

export default ProgressRing;
