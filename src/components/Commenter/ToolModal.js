import React, { useEffect, useRef } from 'react';

import PenModal from './PenModal';

const ToolModal = ({
  UI,
  isModalOpen,
  color,
  setColor,
  size,
  setSize,
  isStraightMode,
  setIsStraightMode,
}) => {
  return (
    <div
      className="ToolModal"
    >
      <PenModal
        UI={UI}
        color={color}
        setColor={setColor}
        size={size}
        setSize={setSize}
        isStraightMode={isStraightMode}
        setIsStraightMode={setIsStraightMode}
      />
    </div>
  );
};

export default ToolModal;
