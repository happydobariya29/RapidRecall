import React from "react";
// import './App.css';

function Alert(props) {
  const capitalize = (word)=>{
    if (word === "danger"){
        word = "error";
    }
    if (word === "success"){
        word = "Congratulations";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div>
      <div style={{height: '50px',marginTop:"56px"}}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
          {/* <strong>Holy guacamole!</strong> You should check in on some of those fields below. */}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}</div>
    </div>
  );
}

export default Alert;