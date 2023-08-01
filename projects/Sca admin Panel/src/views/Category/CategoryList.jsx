import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import Datatable from "react-bs-datatable";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";

const CategoryList = (props) => {
  const notiRef = useRef();
  const header = [
    { title: "ID", prop: "id", sortable: true, filterable: true },
    {
      title: "Category Image",
      prop: "categoryImage",
      sortable: true,
      filterable: true,
    },
    {
      title: "Category Name",
      prop: "categoryName",
      sortable: true,
      filterable: true,
    },
    { title: "Tax", prop: "taxPercentage", sortable: true, filterable: true },
    { title: "Created", prop: "createdAt", sortable: true, filterable: true },
    { title: "Updated", prop: "updatedAt", sortable: true, filterable: true },
    { title: "Status", prop: "status", sortable: true, filterable: true },
    { title: "Action", prop: "action", sortable: true, filterable: true },
    // { title: "Phone", prop: "phone", sortable: true, filterable: true },
    // { title: "Date", prop: "date", sortable: true, filterable: true },
  ];

  const customLabels = {
    first: "<<",
    last: ">>",
    prev: "<",
    next: ">",
    show: "Display ",
    entries: " rows",
    noResults: "There is no data to be displayed",
  };
  const [data, setData] = useState([]);
  const [render, setRerender] = useState(false);

  function action(info) {
    console.log(info);
    api
      .post("/admin/product/updateCategory", {
        categoryId: info.id,
        status: info.status === "active" ? "inactive" : "active",
      })
      .then((res) => {
        console.log(res.data.data);
        setRerender(!render);
        notify(res.data.data, "success");
      })
      .catch((err) => {
        console.log(err);
        notify(err, "danger");
      });
  }

  function notify(msg, type) {
    var type = type;
    var options = {};
    options = {
      place: "tc",
      message: (
        <div className="notification-msg">
          <div className="text-center">{msg}</div>
        </div>
      ),
      type: type,
      icon: "",
      autoDismiss: 3,
    };
    notiRef.current.notificationAlert(options);
  }

  useEffect(() => {
    const getCate = () => {
      api
        .get("/admin/product/getCategory")
        .then((res) => {
          // console.log(res.data.data[0]);
          if (res.data.data != "No Categories Found") {
            setData(
              res.data.data.map((info) => ({
                ...info,
                categoryName: (
                  <span style={{ textTransform: "capitalize" }}>
                    {info.categoryName}
                  </span>
                ),
                categoryImage: (
                  <img src={"https://api.bioforhealth.in" + info.categoryImage} width={80} height={80} />
                ),
                status:
                  info.status == "active" ? (
                    <button
                      className="btn btn-danger"
                      style={{ padding: "8px", paddingRight: "10px" }}
                      onClick={() => action(info)}
                    >
                      Delete
                    </button>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      style={{ padding: "8px", paddingRight: "10px" }}
                      onClick={() => action(info)}
                    >
                      <i className="i-action-undo"></i> <span>Undo</span>
                    </button>
                  ),
                createdAt: moment(data.createdAt).fromNow(),
                updatedAt: moment(data.updatedAt).fromNow(),
                action: (
                  // <NavLink to={'/updateCategory/'+info.id}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: "8px", paddingRight: "10px" }}
                    onClick={() =>
                      (window.location.href = "/updateCategory/" + info.id)
                    }
                  >
                    <i className="i-pencil"></i> <span>Edit</span>
                  </button>
                  // </NavLink>
                ),
              }))
            );
          }
        })
        .catch((err) => console.log(err));
    };
    getCate();
  }, [render, props.render]);
  // console.log(data);

  return (
    <div className="col-12">
      <div className="notification-popup">
        <NotificationAlert ref={notiRef} />
      </div>
      <section className="box ">
        <header className="panel_header">
          <h2 className="title float-left">Category Lists</h2>
        </header>
        <div className="content-body">
          <div className="row">
            <div className="col-lg-12 dt-disp">
              <Datatable
                tableHeader={header}
                tableBody={data}
                keyName="userTable"
                tableClass="striped table-hover table-responsive"
                rowsPerPage={10}
                rowsPerPageOption={[5, 10, 15, 20, 30]}
                initialSort={{ prop: "id", isAscending: true }}
                // onSort={onSortFunction}
                labels={customLabels}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryList;
