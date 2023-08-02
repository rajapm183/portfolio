import React from "react";

function SkillItem2({ name, link }) {
  return (
    <div className="col-sm-6 col-md-4 col-xl-3 ">
      <div className="language-card">
        <img src={link} alt={name} />
        <h6>{name}</h6>
      </div>
    </div>
  );
}

export default SkillItem2;
