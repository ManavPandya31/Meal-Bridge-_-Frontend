import React from "react";
import PropTypes from "prop-types";

export default function LoadingOverlay({ message = "" }) {
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-white mb-4"></div>
      <div className="text-white text-lg font-semibold">{message}</div>
    </div>
  );
}

// ✅ Add PropTypes validation
LoadingOverlay.propTypes = {
  message: PropTypes.string
};
