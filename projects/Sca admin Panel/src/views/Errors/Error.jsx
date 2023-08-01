import React from "react";

export const Error = () => {
  return (
    <div className="box">
           <div className="content">
     <div style={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center"
     }}>
     <h1>404 Page Not Found</h1>
      <p style={{
        fontWeight:"bold",
        color:"red",
      }}>Sorry, the page you are looking for does not exist.</p>
      </div>
     </div>
    </div>
  );
};
