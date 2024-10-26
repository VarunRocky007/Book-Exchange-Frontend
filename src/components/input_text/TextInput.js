import "./TextInput.css";

const TextInput = ({ type, label, value, onChange }) => {
  return (
    <div className="input-text">
      <input
        type={type}
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default TextInput;
