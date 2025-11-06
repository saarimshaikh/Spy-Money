
import React from 'react';

interface CircularProgressProps {
  percentage: number;
  remaining: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage, remaining }) => {
  const radius = 80;
  const strokeWidth = 15;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  let progressColor = 'stroke-green-500';
  if (percentage > 75) progressColor = 'stroke-yellow-500';
  if (percentage >= 100) progressColor = 'stroke-red-500';

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
        <circle
          className="stroke-border-color"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={`${progressColor} transition-all duration-500`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-xs text-text-secondary">Remaining</span>
        <span className="text-3xl font-bold text-text-primary">
          ₹{remaining < 0 ? 0 : remaining.toLocaleString('en-IN')}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
