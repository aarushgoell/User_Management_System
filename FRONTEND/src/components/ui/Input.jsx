export function Input({ type, placeholder, name, setState, value }) {
  return (
    <div>
      <div class = "inputname">{name}:</div>
      <div class = "input">
        <input
          type={type}
          placeholder={placeholder}
          value= {value}
          onChange={(e) => {
            setState(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
