import React, { useEffect } from 'react';

const PenModal = ({
  UI,
  color,
  setColor,
  size,
  setSize
}) => {
  useEffect(() => {}, [UI]);

  return (
    <div className="PenModal">
        <ul>
          <li><button className={color=='red'?'red active':'red'} onClick={()=>setColor('red')}></button></li>
          <li><button className={color=='green'?'green active':'green'} onClick={()=>setColor('green')}></button></li>
          <li><button className={color=='blue'?'blue active':'blue'} onClick={()=>setColor('blue')}></button></li>
          <li><button className={color=='orange'?'orange active':'orange'} onClick={()=>setColor('orange')}></button></li>
        </ul>
      {/*<div className="color-container">
        <p
          style={{
            marginBottom: '10px',
            boxShadow: '0 0 3px rgba(0,0,0,0.2)',
            padding: '3px',
          }}
        >
          Color
        </p>
        <input
          type="color"
          onChange={e => setColor(e.target.value)}
          value={color}
          style={{ marginBottom: '20px' }}
        />
      </div>
      <div
        className="size-container"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <p
          style={{
            marginBottom: '10px',
            boxShadow: '0 0 3px rgba(0,0,0,0.2)',
            padding: '5px',
          }}
        >
          Size
        </p>
        <input
          type="range"
          min="1"
          max="70"
          step="1"
          value={size}
          onChange={e => setSize(parseInt(e.target.value))}
        />
        <span style={{ boxShadow: '0 0 3px rgba(0,0,0,0.2)', padding: '5px' }}>
          {size}
        </span>
      </div>*/}
    </div>
  );
};

export default PenModal;
