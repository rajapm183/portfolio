import React from "react";

const DashboardCard = ({ title, count = 0, icon }) => {
  return (
    <div className="col-xl-4 col-lg-3 col-md-4 col-sm-6 col-6">
      <div className="db_box iconbox">
        <div className="widdata">
          <div className="pt-3 pb-2">{icon}</div>

          <h3 className="widtitle" style={{ whiteSpace: "pre-line" }}>
            {title}
          </h3>
          <p className="widtag" style={{ fontWeight: "400", fontSize: "18px" }}>
           {count}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
