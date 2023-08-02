import React from "react";
import "./Projectcard.css";

export const ProjectCard = ({ img, title, desc, link }) => {
  return (
    
        <a href={link}>
        <div className="cards">
          <img src={img} alt="" />
          <h4 className="mt-4">{title}</h4>
        </div>
      </a>
        
      

  );
};
