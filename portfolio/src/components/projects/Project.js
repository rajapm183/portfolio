import React from "react";
import "./Project.css";
import { ProjectCard } from "./ProjectCard";

export const Project = () => {
  const Projects = [
    {
      img: "https://rajapm183.github.io/portfolio/projects/Shriknightwear/images/iStock-1308102356.jpg",
      title: "ShriKnightwear",
      link: "https://rajapm183.github.io/portfolio/projects/Shriknightwear/index.html",
    },
    {
      img: "https://rajapm183.github.io/portfolio/projects/Mamasa/assets/images/gallery_slides/highlights/img6.jpg",
      title: "Mamasa",
      link: "https://rajapm183.github.io/portfolio/projects/Mamasa/index.html",
    },
   
   
  ];
  return (
    <div className="project pt-3">
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "0px",
        }}
      >
        Projects
      </h1>
      <div className="row pt-3">
        {Projects.map((project, index) => (
          <div key={index} className="col-lg-3">
            <ProjectCard
              img={project.img}
              title={project.title}
              link={project.link}
            />
          </div>
        ))}
      </div>
    </div>)
};
