import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NotFound">
        <h1>404 Page Not Found</h1>
        <p className="NotFound-text">
          The page you were looking for doesn't exist
        </p>
        <Link to="/" className="NotFound-link">
          Return to Home Page
        </Link>
      </div>
    );
  }
}
export default NotFound;
