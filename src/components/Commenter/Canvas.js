import React, { useEffect, useRef, useState } from 'react';

const Canvas = ({
  UI,
  isModalOpen,
  color,
  size,
  isStraightMode,
  polylines,
  setPolylines,
  polylineCount,
  setPolylineCount,
  setXY,
  showCommenter
}) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imgRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnArray, setDrawnArray] = useState([]);
  const [points, setPoints] = useState({});
  const [straightPoint, setStraightPoint] = useState({ start: {} });

  useEffect(() => {if(ctxRef.current!=null){ctxRef.current.strokeStyle = color;}}, [isModalOpen, color, size, isStraightMode, UI]);

  useEffect(() => {
    const userImage = new Image();
    userImage.src = UI.image;
    userImage.onload = () => {
      imgRef.current = userImage;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      canvas.width = userImage.width;
      canvas.height = userImage.height;
      canvas.style.width = `${userImage.width}px`;
      canvas.style.height = `${userImage.height}px`;
      canvas.style.top = '0';
      canvas.style.left = '0';

      ctx.lineCap = 'round';
      // if (userImage.width > 700 || userImage.height > 500) {
      //   canvas.style.transform = `scale(${Math.min(
      //     700 / userImage.width,
      //     500 / userImage.height
      //   )})`;
      //   ctx.lineWidth =
      //     size * Math.max(userImage.width / 700, userImage.height / 500);
      // }

      ctx.drawImage(userImage, 0, 0);

      ctxRef.current = ctx;
    };
  }, [UI.image]);

  useEffect(() => {
    clearAndDraw();
  }, [polylineCount]);

  const clearAndDraw = () =>{
    if (ctxRef.current) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      ctxRef.current.drawImage(imgRef.current, 0, 0);
      if(polylineCount==0) ctxRef.current.beginPath();
      for (let i = 0; i < polylineCount; i++) {
        ctxRef.current.beginPath();
        if (polylines[i][0].isStraight===3) {
          for (let j = 0; j < polylines[i].length - 1; j++) {
            ctxRef.current.strokeStyle = polylines[i][j].color;
            ctxRef.current.lineWidth = polylines[i][j].size;
            ctxRef.current.moveTo(polylines[i][j].x, polylines[i][j].y);
            ctxRef.current.lineTo(polylines[i][j + 1].x, polylines[i][j + 1].y);
            ctxRef.current.stroke();
          }
        } else if (polylines[i][0].isStraight===2) {
          for (let j = 0; j < polylines[i].length; j++) {
            ctxRef.current.strokeStyle = polylines[i][j].color;
            ctxRef.current.lineWidth = polylines[i][j].size;
            // ctxRef.current.rect(polylines[i][j].x, polylines[i][j].y,polylines[i][j].w,polylines[i][j].h);
            drawRoundReact(polylines[i][j]);
            ctxRef.current.stroke();
          }
        } else if (polylines[i][0].isStraight===1) {
          for (let j = 0; j < polylines[i].length - 1; j++) {
            ctxRef.current.strokeStyle = polylines[i][j].color;
            ctxRef.current.lineWidth = polylines[i][j].size;
            ctxRef.current.moveTo(polylines[i][j].x, polylines[i][j].y);
            drawLineWithArrowhead({x:polylines[i][j].x,y:polylines[i][j].y},{ x: polylines[i][j + 1].x, y: polylines[i][j + 1].y, size, color, isStraight: 1 });
            ctxRef.current.stroke();
          }
        } else {
          for (let j = 1; j < polylines[i].length - 1; j++) {
            if (polylines[i][j].jsClosed) continue;

            ctxRef.current.strokeStyle = polylines[i][j].color;
            ctxRef.current.lineWidth = polylines[i][j].size;
            ctxRef.current.moveTo(polylines[i][j].x, polylines[i][j].y);
            ctxRef.current.lineTo(polylines[i][j + 1].x, polylines[i][j + 1].y);
            ctxRef.current.stroke();
          }
        }

        ctxRef.current.closePath();
      }
    }
  }
  const drawRoundReact = (p0) => {
    ctxRef.current.moveTo(p0.w<0?p0.x - 10:p0.x + 10, p0.y);
    ctxRef.current.arcTo(p0.x + p0.w, p0.y, p0.x + p0.w, p0.y + p0.h, 10);
    ctxRef.current.arcTo(p0.x + p0.w, p0.y + p0.h, p0.x, p0.y + p0.h, 10);
    ctxRef.current.arcTo(p0.x, p0.y + p0.h, p0.x, p0.y, 10);
    ctxRef.current.arcTo(p0.x, p0.y, p0.x + p0.w, p0.y, 10);
  }
  const drawLineWithArrowhead = (p0,p1) =>{
    var PI=Math.PI;
    var degreesInRadians225=225*PI/180;
    var degreesInRadians135=135*PI/180;

    var dx=p1.x-p0.x;
    var dy=p1.y-p0.y;
    var angle=Math.atan2(dy,dx);

    var x225=p1.x+10*Math.cos(angle+degreesInRadians225);
    var y225=p1.y+10*Math.sin(angle+degreesInRadians225);
    var x135=p1.x+10*Math.cos(angle+degreesInRadians135);
    var y135=p1.y+10*Math.sin(angle+degreesInRadians135);

    ctxRef.current.moveTo(p0.x,p0.y);
    ctxRef.current.lineTo(p1.x,p1.y);
    ctxRef.current.moveTo(p1.x,p1.y);
    ctxRef.current.lineTo(x225,y225);
    ctxRef.current.moveTo(p1.x,p1.y);
    ctxRef.current.lineTo(x135,y135);
  }
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isStraightMode===3) {
      setStraightPoint(prev => {
        return {
          ...prev,
          start: { x: offsetX, y: offsetY, size, color, isStraight: 3 },
        };
      });

      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    } else if (isStraightMode===2) {
      setStraightPoint(prev => {
        return {
          ...prev,
          start: { x: offsetX, y: offsetY, size, color, isStraight: 2 },
        };
      });

      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    } else if (isStraightMode===1) {
      setStraightPoint(prev => {
        return {
          ...prev,
          start: { x: offsetX, y: offsetY, size, color, isStraight: 1 },
        };
      });
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    } else {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(offsetX, offsetY);
    }

    if(showCommenter) setIsDrawing(true);
  };

  const finishDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;

    if (isStraightMode===3) {
      polylines.push([
          straightPoint.start,
          { x: offsetX, y: offsetY, size, color, isStraight: 3 },
      ])
      setPolylines(polylines);
      setPolylineCount(polylineCount+1);

      setStraightPoint({ start: {}, finish: {} });
      updateXY(((polylines[0][0].x + polylines[0][1].x)/2),((polylines[0][0].y + polylines[0][1].y)/2));
    } else if (isStraightMode===2) {
      polylines.push([
          { x: straightPoint.start.x, y: straightPoint.start.y, size, color, isStraight: 2, w: offsetX-straightPoint.start.x, h:offsetY-straightPoint.start.y },
      ])
      setPolylines(polylines);
      setPolylineCount(polylineCount+1);

      setStraightPoint({ start: {}, finish: {} });
      updateXY(polylines[0][0].x + (polylines[0][0].w/2),polylines[0][0].y + (polylines[0][0].h/2));
    } else if (isStraightMode===1) {
      polylines.push([
          straightPoint.start,
          { x: offsetX, y: offsetY, size, color, isStraight: 1 },
      ]);
      setPolylines(polylines);
      setPolylineCount(polylineCount+1);

      setStraightPoint({ start: {}, finish: {} });
      updateXY(((polylines[0][0].x + polylines[0][1].x)/2),((polylines[0][0].y + polylines[0][1].y)/2));
    } else {
      polylines.push(drawnArray)
      setPolylines(polylines);
      setPolylineCount(polylineCount+1);
      setDrawnArray([]);
      updateXY(polylines[0][Math.floor((polylines[0].length-1)/2)].x,polylines[0][Math.floor((polylines[0].length-1)/2)].y);
    }
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const updateXY = (x,y) => {
    // let index=x+(y*canvasRef.current.width);
    // let x1 = index % canvasRef.current.width;
    // let y1 = index / canvasRef.current.height;
    // console.log(x+' - '+y+' - '+x1+' - '+y1+' - '+canvasRef.current.width+' - '+canvasRef.current.height);
    // setXY(x1,y1);
    setXY(x,y);
  }

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = nativeEvent;

    if (isStraightMode===3) {
      clearAndDraw();
      ctxRef.current.moveTo(straightPoint.start.x, straightPoint.start.y);
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    } else if (isStraightMode===2) {
      clearAndDraw();
      ctxRef.current.moveTo(straightPoint.start.x, straightPoint.start.y);
      let width = offsetX-straightPoint.start.x;
      let height = offsetY-straightPoint.start.y;
      // ctxRef.current.rect(straightPoint.start.x, straightPoint.start.y, width, height);
      drawRoundReact({x:straightPoint.start.x,y:straightPoint.start.y,w:width,h:height});
      ctxRef.current.stroke();
    } else if (isStraightMode===1) {
      clearAndDraw();
      ctxRef.current.moveTo(straightPoint.start.x, straightPoint.start.y);
      drawLineWithArrowhead(straightPoint.start,{ x: offsetX, y: offsetY, size, color, isStraight: 1 });
      ctxRef.current.stroke();
    }else {
      setPoints(prev => {
        return { ...prev, x: offsetX, y: offsetY, size, color };
      });
      setDrawnArray(prev => [...prev, points]);

      ctxRef.current.strokeStyle = color;
      ctxRef.current.lineWidth = size;
      ctxRef.current.lineTo(offsetX, offsetY);
      ctxRef.current.stroke();
    }
    setPolylines(polylines.filter((item, index) => index < polylineCount));
  };
  return (
    <div
      className="Canvas"
      style={
        showCommenter
          ? {
              cursor: 'crosshair',
            }
          : {
              cursor: 'pointer',
            }
      }
    >
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={isDrawing ? finishDrawing : console.log}
        onMouseMove={draw}
        style={{ position: 'absolute', transformOrigin: '0 0' }}
      />
    </div>
  );
};

export default Canvas;
