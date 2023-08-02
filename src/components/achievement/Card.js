import React, { useState } from "react";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';


function Card({ data }) {
  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-3 achievement-card p-0 ">
        <img src={data.img} alt="aa" />
        <div>
          <h5>{data.title}</h5>
        </div>
        <div className="buttons">
          <button type="button" >
            <LibraryBooksIcon /> More
          </button>
        </div>
      </div>
    </>
  );
}

export default Card;