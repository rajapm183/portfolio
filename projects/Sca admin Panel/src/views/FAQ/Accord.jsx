import React, { useState } from 'react';
import { Collapse } from 'reactstrap';

function Accord(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="container">
        <div className="row mb-3">
            <div className="col-4 col-sm-8 offset-sm-2">
            <div className="wrapper">
              <div className={isOpen? "open" : ""  } onClick={toggle}>
              <div className="title">
              {props.title} <span className={isOpen?  "arrow-dw" : "arrow"}>
              <i className="fa fa-angle-down"></i></span></div>
              </div> 
            <Collapse isOpen={isOpen}>
            <h5 className="m-3">{props.head}</h5>
            <p className="m-3">{props.text}</p>
            </Collapse>
            </div>
            </div>
        </div>
    </div>
  );
}

export default Accord