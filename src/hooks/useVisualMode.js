import { useState } from "react";

export default function useVisualMode(value) {
  const [mode, setMode] = useState(value);
  const [history, setHistory] = useState([]);

  function transition(valueTo, skipPrevious) {
    if (!skipPrevious) {
      setHistory([...history, mode]);
    }
    setMode(valueTo);
  }
  function back() {
    if(history.length >= 1) {
      setMode(history.pop());
    }
  }
  return {transition, mode, back};
}