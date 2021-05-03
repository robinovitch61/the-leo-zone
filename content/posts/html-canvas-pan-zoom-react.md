---
title: "react html5 zoom/pan canvas"
date: 2021-05-02T21:47:48-07:00
---

A pannable, mouse-centered zoomable, HTML5 canvas template in React + Typescript. You'd think this would be a solved problem, but despite the plethora of solutions out there, I couldn't get quite what I wanted for some time. Finally, here it all is in one place for future me and others to use as boilerplate for their embedded interactive canvases in their apps.

If you see any bugs or possible improvements, please comment on the gist here:

https://gist.github.com/robinovitch61/483190546bf8f0617d2cd510f3b4b86d

<iframe
    src="https://codesandbox.io/embed/react-typescript-zoom-pan-html-canvas-p3itj?fontsize=14&hidenavigation=1&theme=dark"
    style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
    title="React  Typescript Zoom Pan HTML Canvas"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

```typescript
// sandbox here: https://codesandbox.io/s/p3itj?file=/src/Canvas.tsx:0-6785
// gist for comments here: https://gist.github.com/robinovitch61/483190546bf8f0617d2cd510f3b4b86d

import {
  useEffect,
  useCallback,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import * as React from "react";

type CanvasProps = {
  canvasWidth: number;
  canvasHeight: number;
};

type Point = {
  x: number;
  y: number;
};

const ORIGIN = Object.freeze({ x: 0, y: 0 });

function diffPoints(p1: Point, p2: Point) {
  return { x: p1.x - p2.x, y: p1.y - p2.y };
}

function addPoints(p1: Point, p2: Point) {
  return { x: p1.x + p2.x, y: p1.y + p2.y };
}

function scalePoint(p1: Point, scale: number) {
  return { x: p1.x / scale, y: p1.y / scale };
}

const ZOOM_SENSITIVITY = 500; // bigger for lower zoom per scroll

export default function Canvas(props: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [scale, setScale] = useState<number>(1);
  const [offset, setOffset] = useState<Point>(ORIGIN);
  const [mousePos, setMousePos] = useState<Point>(ORIGIN);
  const [isReset, setIsReset] = useState(false);
  const viewportTopLeftRef = useRef<Point>(ORIGIN);
  const lastMousePosRef = useRef<Point>(ORIGIN);
  const lastOffsetRef = useRef<Point>(ORIGIN);

  // reset at start and on button click
  const reset = useCallback(() => {
    if (canvasRef.current) {
      // get new drawing context
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx && !isReset) {
        // scale for pixels
        const { devicePixelRatio: ratio = 1 } = window;
        renderCtx.canvas.width = props.canvasWidth * ratio;
        renderCtx.canvas.height = props.canvasHeight * ratio;
        renderCtx.scale(ratio, ratio);
        setScale(ratio);

        // reset other values
        setContext(renderCtx);
        setOffset(ORIGIN);
        setMousePos(ORIGIN);
        lastOffsetRef.current = ORIGIN;
        viewportTopLeftRef.current = ORIGIN;
        lastMousePosRef.current = ORIGIN;
        setIsReset(true);
      }
    }
  }, [props.canvasHeight, props.canvasWidth, isReset]);

  // functions for panning
  const mouseMove = useCallback(
    (event: MouseEvent) => {
      if (context) {
        const lastMousePos = lastMousePosRef.current;
        const currentMousePos = { x: event.pageX, y: event.pageY }; // use document so can pan off element
        lastMousePosRef.current = currentMousePos;

        const mouseDiff = diffPoints(currentMousePos, lastMousePos);
        setOffset((prevOffset) => addPoints(prevOffset, mouseDiff));
      }
    },
    [context]
  );

  const mouseUp = useCallback(() => {
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
  }, [mouseMove]);

  const startPan = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
      document.addEventListener("mousemove", mouseMove);
      document.addEventListener("mouseup", mouseUp);
      lastMousePosRef.current = { x: event.pageX, y: event.pageY };
    },
    [mouseMove, mouseUp]
  );

  // setup canvas and set context
  useEffect(() => {
    reset();
  }, []);

  // pan when offset changes
  useLayoutEffect(() => {
    if (context && lastOffsetRef.current) {
      const offsetDiff = scalePoint(
        diffPoints(offset, lastOffsetRef.current),
        scale
      );
      context.translate(offsetDiff.x, offsetDiff.y);
      viewportTopLeftRef.current = diffPoints(
        viewportTopLeftRef.current,
        offsetDiff
      );
      setIsReset(false);
    }
  }, [context, offset, scale]);

  // update last offset
  useEffect(() => {
    lastOffsetRef.current = offset;
  }, [offset]);

  // draw
  useLayoutEffect(() => {
    if (context) {
      const squareSize = 20;

      // clear canvas but maintain transform
      const storedTransform = context.getTransform();
      context.canvas.width = context.canvas.width;
      context.setTransform(storedTransform);

      context.fillRect(
        props.canvasWidth / 2 - squareSize / 2,
        props.canvasHeight / 2 - squareSize / 2,
        squareSize,
        squareSize
      );
      context.arc(
        viewportTopLeftRef.current.x,
        viewportTopLeftRef.current.y,
        5,
        0,
        2 * Math.PI
      );
      context.fillStyle = "red";
      context.fill();
    }
  }, [props.canvasWidth, props.canvasHeight, context, isReset, scale, offset]);

  // add event listener on canvas for mouse position
  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem === null) {
      return;
    }

    function handleUpdateMouse(event: MouseEvent) {
      event.preventDefault();
      if (canvasRef.current) {
        const viewportMousePos = { x: event.clientX, y: event.clientY };
        const topLeftCanvasPos = {
          x: canvasRef.current.offsetLeft,
          y: canvasRef.current.offsetTop
        };
        setMousePos(diffPoints(viewportMousePos, topLeftCanvasPos));
      }
    }

    canvasElem.addEventListener("mousemove", handleUpdateMouse);
    canvasElem.addEventListener("wheel", handleUpdateMouse);
    return () => {
      canvasElem.removeEventListener("mousemove", handleUpdateMouse);
      canvasElem.removeEventListener("wheel", handleUpdateMouse);
    };
  }, []);

  // add event listener on canvas for zoom
  useEffect(() => {
    const canvasElem = canvasRef.current;
    if (canvasElem === null) {
      return;
    }

    // this is really tricky
    function handleWheel(event: WheelEvent) {
      event.preventDefault();
      if (context) {
        const zoom = 1 - event.deltaY / ZOOM_SENSITIVITY;
        const viewportTopLeftDelta = {
          x: (mousePos.x / scale) * (1 - 1 / zoom),
          y: (mousePos.y / scale) * (1 - 1 / zoom)
        };
        const newViewportTopLeft = addPoints(
          viewportTopLeftRef.current,
          viewportTopLeftDelta
        );

        context.translate(
          viewportTopLeftRef.current.x,
          viewportTopLeftRef.current.y
        );
        context.scale(zoom, zoom);
        context.translate(-newViewportTopLeft.x, -newViewportTopLeft.y);

        viewportTopLeftRef.current = newViewportTopLeft;
        setScale(scale * zoom);
        setIsReset(false);
      }
    }

    canvasElem.addEventListener("wheel", handleWheel);
    return () => canvasElem.removeEventListener("wheel", handleWheel);
  }, [context, mousePos.x, mousePos.y, scale]);

  return (
    <div>
      <button onClick={reset}>Reset</button>
      <pre>scale: {scale}</pre>
      <pre>offset: {JSON.stringify(offset)}</pre>
      <canvas
        id="canvas"
        onMouseDown={startPan}
        ref={canvasRef}
        width={props.canvasWidth}
        height={props.canvasHeight}
        style={{
          border: "2px solid #000"
        }}
      ></canvas>
    </div>
  );
}
```

