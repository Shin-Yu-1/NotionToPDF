import { useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <div>
        <input type="text" ref={inputRef} />
      </div>
    </>
  );
}

export default App;
