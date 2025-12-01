import { useState } from "react";

export function Input({ type, placeholder, name }) {
  const [inputState, setInputstate] = useState("");
  return (
    <div>
      <div>{name}:</div>

      <div>
        <input
          type={type}
          placeholder={placeholder}
          value={inputState}
          onChange={(e) => {
            setInputstate(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
