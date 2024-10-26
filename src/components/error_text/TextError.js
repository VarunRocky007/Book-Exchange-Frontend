import "./TextError.css";

const TextError = ({ errorText }) => {
  return (
    <div className="error">
      <span className="common-font">{errorText} </span>
    </div>
  );
};

export default TextError;
