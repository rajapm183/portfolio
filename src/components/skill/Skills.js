import React from "react";
import { Element } from "react-scroll";
import SkillItem from "./SkillItem";
import SkillItem2 from "./SkillItem2";
import "./Skills.css";



function Skills() {
  const skills = [
    {
      name: "HTML5",
      link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "#945915",
    },
    {
      name: "CSS3",
      //  link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg",
      link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "#0C3A80",
    },
    {
      name: "Javascript",
      link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#858626",
    },
    {
      name: "Bootstrap",
      link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      color: "#574669",
    },
    {
      name: "React",
      link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyxBAQOdkXwqHxusqs2VSD18ebesGRr7Hvtg&usqp=CAU",
      color: "#1C5C61",
    },
    // {
    //   name: "NodeJS",
    //   link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    //   // link: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg",
    //   color: "#3D1515",
    // },

    // {
    //   name: "Express",
    //   link: "./asset/expressjs.png",
    //   // link:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    //   // link: "https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg",
    //   color: "#1C3D15",
    // },

    // {
    //   name: "MySQl",
    //   // link : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
    //   link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-plain.svg",
    //   color: "#44807E",
    // },
    // {
    //   name: "Mongo DB",
    //   link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg",
    //   // link : "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original-wordmark.svg",
    //   color: "#308320",
    // },
    {
      name: "Redux",
      link: "./asset/redux.svg",
      color: "#856969",
    },
    {
      name: "Redux-toolkit",
      link: "./asset/redux.svg",
      color: "#856969",
    },
    // {
    //   name: "AWS",
    //   link: "./asset/aws.svg",
    //   color: "#856969",
    // },
    {
      name: "Material UI",
      link: "./asset/materialui.svg",
      color: "#856969",
    },
    // {
    //   name: "Chart JS",
    //   link: "./asset/chartjs.svg",
    //   color: "#856969",
    // },
    // {
    //   name: "JWT",
    //   link: "./asset/jwt.svg",
    //   color: "#856969",
    // },
    // {
    //   name: "Tailwind CSS",
    //   link: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    //   percentage: "80%",
    // },
  ];
  const skills2 = [
    {
      name: "Postman",
      link: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
      color: "",
    },
    {
      name: "VsCode",
      link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      color: "#856969",
    },
    // {
    //   name: "Heroku",
    //   link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain.svg",
    //   color: "",
    // },
    {
      name: "GitHub",
      link: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg",
      color: "#856969",
    },
    // {
    //   name: "Netlify",
    //   link: "./asset/netlify.svg",
    //   color: "#856969",
    // },
    // {
    //   name: "Vercel",
    //   link: "./asset/vercel.svg",
    //   color: "#856969",
    // },
  ];

  return (
    <Element name="skills">
      <div className="main">
        <h1>
          Professional <span className="skills-highlight">Skillset</span>
        </h1>
        <div className="row skill-container mx-auto">
          {skills.map((item, index) => {
            return (
              <SkillItem
                key={index}
                name={item.name}
                link={item.link}
                percentage={item.percentage}
                color={item.color}
              />
            );
          })}
        </div>
        <div className="row skill-container mx-auto">
          <h3 className="pt-3">
            <span className="skills-highlight">Tools</span> I use
          </h3>
          {skills2.map((item, index) => {
            return (
              <SkillItem2
                key={index}
                name={item.name}
                link={item.link}
                percentage={item.percentage}
                color={item.color}
              />
            );
          })}
        </div>
        -
      </div>
    </Element>
  );
}

export default Skills;
