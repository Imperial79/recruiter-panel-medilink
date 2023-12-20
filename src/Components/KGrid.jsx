import React from "react";

function KGrid({ crossAxisCount, gap, children }) {
  return (
    <div
      className={`md:grid md:grid-cols-${crossAxisCount} gap-${gap} mb-5 items-center`}
    >
      {children}
    </div>
  );
}

export default KGrid;
