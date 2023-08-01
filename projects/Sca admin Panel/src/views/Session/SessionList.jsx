import React, { useEffect, useState, useRef } from "react";
import moment from "moment";
import Datatable from "react-bs-datatable";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";
import Swal from "sweetalert2";

const SessionList = (props) => {
  const notiRef = useRef();
  const header = [
    { title: "ID", prop: "id", sortable: true, filterable: true },
    {
        title: "Ip",
        prop: "Ip",
        sortable: true,
        filterable: true,
      },
    {
      title: "User Agent",
      prop: "userAgent",
      sortable: true,
      filterable: true,
    },
    
    { title: "Created", prop: "createdAt", sortable: true, filterable: true },
    { title: "Updated", prop: "updatedAt", sortable: true, filterable: true },
    { title: "Status", prop: "status", sortable: true, filterable: true },
    { title: "Action", prop: "action", sortable: true, filterable: true },
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

  function action(info) {
    console.log(info);
    api
      .post("/admin/product/deleteProduct", {
        productId: info.id,
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
  const Delete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this session?",
      // text: "Did u want to delete this session",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it !",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .post("/admin/auth/deleteSession", { id })
          .then((res) => {
            // console.log("response",res)
            if (res.data.data === "Unable to Delete an Active Session")
              Swal.fire(
                "Unable to Delete an Active Session",
                "Active Session is Protected ",
                "error"
              );
            else Swal.fire("Deleted!", " Session has been deleted.", "success");
            // setAdminList([]);
            setRerender(!render);
            // console.log("response",res);
          })
          .catch((error) => {
            Swal.fire("Cancelled", " session is safe ", "error");
          });
      } else Swal.fire("Cancelled", " session is safe ", "error");
    });
  };
  useEffect(() => {
    api
      .get("/admin/auth/session" )
      .then((res) => {
        console.log(res.data.data);
        if (res.data.data == "No Products Found") return setData([]);
        setData(
          res.data.data.map((data) => ({
              Ip: (
                <span style={{ textTransform: "capitalize" }}>
                  {data.ipv4}
                </span>
              ),
            ...data,
            userAgent: (
              <span >
                {data.userAgent}
              </span>
            ),
            
            status:
              data.status == "active" ? (
                <button
                  className="btn btn-success"
                  style={{ padding: "8px", paddingRight: "10px" }}
                  
                >
                  Active
                </button>
              ) : (
                <button
                  className="btn btn-danger"
                  style={{ padding: "8px", paddingRight: "10px" }}
                
                >
                  <i className="i-action-undo"></i> <span>InActive</span>
                </button>
              ),
            createdAt: moment(data.createdAt).fromNow(),
            updatedAt: moment(data.updatedAt).fromNow(),
            action: (
                <button
                type="button"
                onClick={() => Delete(data.id)}
                class="btn btn-outline-secondary deleterow"
              >
               Delete
              </button>
            ),
           
          }))
        );
      })
      .catch((err) => console.log(err));
  }, [render, props.render]);

  return (
    <div className="col-12">
      <div className="notification-popup">
        <NotificationAlert ref={notiRef} />
      </div>
      <section className="box ">
        <header className="panel_header">
          <h2 className="title float-left">Session Lists</h2>
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
                //   onSort={onSortFunction}
                labels={customLabels}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SessionList;
