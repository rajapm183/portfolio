import React, { useState ,useEffect} from "react";
import MUIDataTable from "mui-datatables";
import "./style.css";
import api from "../../Axios";

const Feedback = () => {
  const [data , setData] = useState([])
  useEffect(() => {
  api.get("/admin/allUsers/viewAllFeedback").then((res) =>
  {
   setData(res.data.data)
  });
  }, [])
  const columns = [
    {
      name: "matrimonyId",
      label: "Matrimony ID",
      options: {
        filter: true,
        sort: true,
      filterOptions: { fullWidth: true } 
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: false,
 
      },
    },
    {
      name: "category",
      label: "Category",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "suggestions",
      label: "Suggestions",
      options: {
        filter: true,
        sort: false,
        filterOptions: { fullWidth: true } 
      },
    },
  ];


  const options = {
    filterType: "checkbox",
    elevation: 0,
    filter: false,
    viewColumns: false,
  };

  return (
    <>
      <div className="container" style={{ marginTop: "10%" }}>
        {/* <h3>Feedback</h3> */}
        <div className="row">
          <MUIDataTable
            title={"Feedback"}
            // data={data}
            options={options}
            columns={columns}
          
          />
        </div>
      </div>
    </>
  );
};

export default Feedback;
