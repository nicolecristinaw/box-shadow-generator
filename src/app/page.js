'use client';

import "./styles.css";
import { useState } from "react";
import { FaCheck, FaRegCopy } from "react-icons/fa";

export default function Home() {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(10);
  const [blur, setBlur] = useState(15);
  const [spread, setSpread] = useState(-3);
  const [color, setColor] = useState("#000000");
  const [opacity, setOpacity] = useState(0.1);
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);
  const rgbaColor = () => {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const copyToClipboard = () => {
    const code = `box-shadow: ${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor()}`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  

  const boxShadowValue = `${inset ? "inset " : ""}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor()}`;

  return (
    <div>
      <h1>Box Shadow Generator</h1>

      <main className="container">
        <div className="controls">
          <div className="control-group">
            <label htmlFor="offsetX">Horizontal displacement</label>
            <input
              type="range"
              id="offsetX"
              min="-100"
              max="100"
              value={offsetX}
              onChange={(e) => setOffsetX(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="offsetY">Vertical displacement</label>
            <input
              type="range"
              id="offsetY"
              min="-100"
              max="100"
              value={offsetY}
              onChange={(e) => setOffsetY(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="blur">Blur</label>
            <input
              type="range"
              id="blur"
              min="0"
              max="100"
              value={blur}
              onChange={(e) => setBlur(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="spread">Spread</label>
            <input
              type="range"
              id="spread"
              min="-50"
              max="50"
              value={spread}
              onChange={(e) => setSpread(Number(e.target.value))}
            />
          </div>

          <div className="control-group">
            <label htmlFor="color">Color</label>
            <input
              type="color"
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label htmlFor="opacity">Opacity</label>
            <input
              type="range"
              id="opacity"
              min="0"
              max="1"
              step="0.01"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
            />
          </div>

          <div className="inline-group">
            <input
              type="checkbox"
              id="inset"
              checked={inset}
              onChange={(e) => setInset(e.target.checked)}
            />
            <label htmlFor="inset">Inner Shadow</label>
          </div>
        </div>

        <div className="result">
          <div
            className="output-box"
            id="box"
            style={{ boxShadow: boxShadowValue }}
          />

          <div className="code-output" id="code">
            <div className="code-header">
              <p>css</p>
              <button id="copyBtn" onClick={copyToClipboard}>
                {copied ? <FaCheck /> : <FaRegCopy />}
                {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <p className="code-line">
              <span>box-shadow:</span>{" "}
              {boxShadowValue};
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
