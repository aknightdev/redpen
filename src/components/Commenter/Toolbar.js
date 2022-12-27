import React, { useEffect } from 'react';
import { FaUndo, FaRedo, FaPaintBrush, FaMinus, FaArrowRight, FaSquare, FaPaperclip } from 'react-icons/fa';

const Toolbar = ({
  UI,
  setIsModalOpen,
  polylines,
  polylineCount,
  setPolylineCount,
  isStraightMode,
  setIsStraightMode,
  postComment,
  attachment,
  setAttachment
}) => {
  useEffect(() => {}, [UI]);
  const buttonStyleActive = {
    backgroundColor: 'white'
  };
  return (
    <div className="Toolbar">
      <div className="toolbar-container">
        <div className="redo-container">
          <div
            className="undo opt"
            onClick={() =>
              polylineCount > 0 && setPolylineCount(polylineCount - 1)
            }
          >
            <FaUndo />
          </div>
          <div
            className="redo opt"
            onClick={() =>
              polylineCount < polylines.length &&
              setPolylineCount(polylineCount + 1)
            }
          >
            <FaRedo />
          </div>
          <div
            className="normal opt"
            onClick={() => {
              setIsStraightMode(0);
            }}
            style={isStraightMode===0 ? buttonStyleActive : {}}
          >
            <FaPaintBrush />
          </div>
          <div
            className="arrow opt"
            onClick={() => {
              setIsStraightMode(1);
            }}
            style={isStraightMode===1 ? buttonStyleActive : {}}
          >
            <FaArrowRight />
          </div>
          <div
            className="square opt"
            onClick={() => {
              setIsStraightMode(2);
            }}
            style={isStraightMode===2 ? buttonStyleActive : {}}
          >
            <FaSquare />
          </div>
          <div
            className="straight opt"
            onClick={() => {
              setIsStraightMode(3);
            }}
            style={isStraightMode===3 ? buttonStyleActive : {}}
          >
            <FaMinus />
          </div> 
          
          <div
            className="paperclip opt"
          >
            <FaPaperclip />
            <input type="file" name="attach" onChange={setAttachment} id="attach" />
          </div><span className="atc_name">{attachment}</span>
          <div className="btn"><button type="button" onClick={postComment}>Send</button></div>
          {/*<div className="reset" onClick={() => setPolylineCount(0)}>
            <svg className="svg-icon" viewBox="0 0 20 20" style={svgIconStyle}>
              <path
                style={pathStyle}
                d="M10.185,1.417c-4.741,0-8.583,3.842-8.583,8.583c0,4.74,3.842,8.582,8.583,8.582S18.768,14.74,18.768,10C18.768,5.259,14.926,1.417,10.185,1.417 M10.185,17.68c-4.235,0-7.679-3.445-7.679-7.68c0-4.235,3.444-7.679,7.679-7.679S17.864,5.765,17.864,10C17.864,14.234,14.42,17.68,10.185,17.68 M10.824,10l2.842-2.844c0.178-0.176,0.178-0.46,0-0.637c-0.177-0.178-0.461-0.178-0.637,0l-2.844,2.841L7.341,6.52c-0.176-0.178-0.46-0.178-0.637,0c-0.178,0.176-0.178,0.461,0,0.637L9.546,10l-2.841,2.844c-0.178,0.176-0.178,0.461,0,0.637c0.178,0.178,0.459,0.178,0.637,0l2.844-2.841l2.844,2.841c0.178,0.178,0.459,0.178,0.637,0c0.178-0.176,0.178-0.461,0-0.637L10.824,10z"
              ></path>
            </svg>
          </div>*/}
        </div>

        {/*<div className="tools-container" style={toolsContainerStyle}>
          <div className="pen" onClick={() => setIsModalOpen(prev => !prev)}>
            <svg className="svg-icon" viewBox="0 0 20 20" style={svgIconStyle}>
              <path
                style={pathStyle}
                d="M17.659,9.597h-1.224c-0.199-3.235-2.797-5.833-6.032-6.033V2.341c0-0.222-0.182-0.403-0.403-0.403S9.597,2.119,9.597,2.341v1.223c-3.235,0.2-5.833,2.798-6.033,6.033H2.341c-0.222,0-0.403,0.182-0.403,0.403s0.182,0.403,0.403,0.403h1.223c0.2,3.235,2.798,5.833,6.033,6.032v1.224c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403v-1.224c3.235-0.199,5.833-2.797,6.032-6.032h1.224c0.222,0,0.403-0.182,0.403-0.403S17.881,9.597,17.659,9.597 M14.435,10.403h1.193c-0.198,2.791-2.434,5.026-5.225,5.225v-1.193c0-0.222-0.182-0.403-0.403-0.403s-0.403,0.182-0.403,0.403v1.193c-2.792-0.198-5.027-2.434-5.224-5.225h1.193c0.222,0,0.403-0.182,0.403-0.403S5.787,9.597,5.565,9.597H4.373C4.57,6.805,6.805,4.57,9.597,4.373v1.193c0,0.222,0.182,0.403,0.403,0.403s0.403-0.182,0.403-0.403V4.373c2.791,0.197,5.026,2.433,5.225,5.224h-1.193c-0.222,0-0.403,0.182-0.403,0.403S14.213,10.403,14.435,10.403"
              ></path>
            </svg>
          </div>
        </div>*/}
      </div>
    </div>
  );
};

export default Toolbar;
