import React from 'react'
import { Element } from "react-scroll";
import Card from './Card';
import './achievement.css';



function Achievement() {
    let data = [
        {
          img: "./asset/certificate/fullstack.png",
          title: "Full Stack Developer",
        },
      ];

  return (
    <Element id="achievement">
             <div className='achievement'>
                  <h1>Certifi<span className='achievement-highlight'>cate</span></h1>
                  <div className="row achievement-container">
          {data.length > 0 &&
            data.map((item, index) => {
              return <Card data={item} key={index} />;
            })}
        </div>
             </div>
    </Element>
  )
}

export default Achievement