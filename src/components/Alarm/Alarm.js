import "./Alarm.css";

function Alarm({ isActiveAlarm, messageAlarm }) {
  return (
    <div className={isActiveAlarm ? "alarm alarm_active" : "alarm"}>
      <p className="alarm__text">{messageAlarm}</p>
    </div>
  );
}

export default Alarm;
