import { Link } from "react-router-dom";
import "./AccountButton.css";
import Navigation from "../Navigation/Navigation";

function AccountButton() {
  return (
    <div className="account-box">
      {" "}
      <Navigation />
      <div className="account-button">
        <Link className="account-button__link" to="/profile">
          Аккаунт
        </Link>
        <div className="account-button__photo"></div>
      </div>
    </div>
  );
}

export default AccountButton;
