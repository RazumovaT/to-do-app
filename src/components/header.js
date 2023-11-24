import { useState, React } from "react";
import PropTypes from "prop-types";
export default function Header(props) {
  const [label, setLabel] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");

  const onInputChange = (e) => {
    e.preventDefault();
    setLabel(e.target.value);
  };

  const onMinChange = (e) => {
    e.preventDefault();
    setMin(e.target.value);
  };

  const onSecChange = (e) => {
    e.preventDefault();
    setSec(e.target.value);
  };

  const onItemSubmit = (e) => {
    e.preventDefault();
    props.onItemAdded(label, min, sec);
    setLabel("");
    setMin("");
    setSec("");
  };

  return (
    <header className="header">
      <h1>Todos</h1>
      <form className="new-todo-form" onSubmit={onItemSubmit}>
        <label>
          <input
            className="new-todo"
            value={label}
            onChange={onInputChange}
            placeholder="Task"
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            value={min}
            onChange={onMinChange}
            placeholder="Min"
            pattern="[0-9]{1,2}"
            maxLength={2}
            autoFocus
            required
          />
          <input
            className="new-todo-form__timer"
            value={sec}
            onChange={onSecChange}
            placeholder="Sec"
            pattern="[0-9]{1,2}"
            maxLength={2}
            autoFocus
            required
          />
        </label>
        <button type="submit" onSubmit={onItemSubmit} />
      </form>
    </header>
  );
}

Header.defaultProps = {
  onItemAdded: () => {},
};

Header.propTypes = {
  onItemAdded: PropTypes.func,
};
