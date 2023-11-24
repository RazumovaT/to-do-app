import { React, useState, useEffect } from "react";
import { formatDistance } from "date-fns";
import PropTypes from "prop-types";

function NewTaskForm({
  label,
  min,
  sec,
  done,
  id,
  isEdit,
  createdAt,
  onDeleted,
  onItemDone,
  onItemEdit,
  onItemSubmit,
  onChange,
}) {
  const [input, setInput] = useState(label);

  let [seconds, setSeconds] = useState(sec);
  let [minutes, setMinutes] = useState(min);
  const [play, setPlay] = useState(true);

  const playInterval = () => {
    setPlay(true);
  };
  const pauseInterval = () => {
    setPlay(false);
  };

  useEffect(() => {
    let interval = null;

    if (play) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0 && minutes !== 0) {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setSeconds(0);
        }
      }, 1000);
    } else if (!play && seconds !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [seconds, minutes, play]);

  const inputChange = (e) => {
    onChange(e.target.value);
    setInput(e.target.value);
  };

  const submitFunc = (e) => {
    e.preventDefault();
    onItemSubmit();
  };

  if (isEdit) {
    return (
      <form onSubmit={(e) => submitFunc(e)}>
        <input
          type="text"
          className="edit"
          value={input}
          onChange={inputChange}
        />
      </form>
    );
  }

  return (
    <label>
      <li className={done ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            name="checkbox"
            id={id}
            checked={done ? true : false}
            onChange={onItemDone}
          />
          <label htmlFor={id}>
            <span className="title">{label}</span>
            <span className="description">
              <button
                className="icon icon-play"
                onClick={playInterval}
              ></button>
              <button
                className="icon icon-pause"
                onClick={pauseInterval}
              ></button>
              {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
            </span>
            <span className="description">
              created{" "}
              {formatDistance(createdAt, Date.now(), {
                includeSeconds: true,
              })}{" "}
              ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={onItemEdit}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
      </li>
    </label>
  );
}

NewTaskForm.defaultProps = {
  label: "",
  min: "",
  sec: "",
  done: false,
  id: Math.random(),
  onDeleted: () => {},
  onItemDone: () => {},
};

NewTaskForm.propTypes = {
  label: PropTypes.string.isRequired,
  done: PropTypes.bool,
  id: PropTypes.number,
  onDeleted: PropTypes.func,
  onItemDone: PropTypes.func,
  playInterval: PropTypes.func,
  pauseInterval: PropTypes.func,
};

export default NewTaskForm;
