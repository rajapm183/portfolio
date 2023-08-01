import React,{useState, useEffect,useRef} from 'react'
import api from "../../Axios";
import Swal from "sweetalert2";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

import Accord from './Accord';
import "./style.css"
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';


import NotificationAlert from "react-notification-alert";
import Select from "react-select";
import { customStyles } from "../../assets/css/CustomStyles";
const FaqAdd = () => {
    const notiRef = useRef();
  const [data, setData] = useState({
    image: "",
    bannerType: "",
    bannerFor: "",
    productOrCategoryId: "",
  });
  const bannertype = [
    { value: "offer", label: "offer", id: "bannerType" },
    { value: "normal", label: "normal", id: "bannerType" },
    { value: "festival", label: "festival", id: "bannerType" },
  ];


  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [render, setRender] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [FAQList, setFAQList] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleChanged = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    api.get("/admin/shop/FAQ").then(async (res) => {
      if (Array.isArray(res.data.data)) setFAQList(res.data.data);
    });
  }, [render]);





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

  //----------- For Product Dropdown ------------------
 
  //----------- For Category Dropdown ------------------
 

  
  const handleSubmit = (e) => {
    // console.log("hitt")
    e.preventDefault();
    e.currentTarget.reset();
    setLoading(true);
    setIsError(false);
    const data = {
      faqTitle: title,
      faqAnswer: description,
    };
    // const formdata = new FormData();
    // Object.entries(data).map((data) => {
    //   formdata.append(data[0], data[1]);
    // });
    api
      .post("/admin/shop/addFAQ", data)
      .then((res) => {
        Swal.fire({
          icon: "success",
          // title: 'Oops...',
          text: "FAQ Added Successfully!",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        setRender(!render);
        setData(res.data);
        setTitle("");
        setDescription("");
        setLoading(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          // title: 'Oops...',
          text: "FAQ  Added Failed!",
          // footer: '<a href="">Why do I have this issue?</a>'
        });
        if (
          err.response &&
          err.response.data &&
          err.response.data.error &&
          typeof err.response.data.error.message === "string"
        )
          if (err.response.data.error.message === "Authentication Failed") {
            localStorage.clear();
            window.location.reload();
          }
        setLoading(false);
        setIsError(true);
      });
  };
  return (
    <>
      <div className="content">
        <div className="notification-popup">
          <NotificationAlert ref={notiRef} />
        </div>
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Banner</h1>
              </div>
            </div>

            <div className="col-12">
              <section className="box ">
                <header className="panel_header">
                  <h2 className="title float-left">Add FAQ"S</h2>
                </header>
                <div className="content-body">
                  <div className="row">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                      <Form onSubmit={handleSubmit}>
                      

                        
                        <FormGroup>
                          <Label htmlFor="bannerFor">Queries</Label>
                          <FormGroup tag="fieldset">
                            <FormGroup check inline>
                              <Label check>
                                <Input
                                  type="text"
                                  name="title"
                                  placeholder="Enter Queries"
                                  value={title}
                                  onChange={(e) => setTitle(e.target.value)}
                                  required={true}
                                />{" "}
                            
                              </Label>
                            </FormGroup>
                            <FormGroup check inline>
                              <Label check>
                                <Input
                                  type="text"
                                  name="description"
                                  value={description}
                                  placeholder="Enter Description"
                          onChange={(e) => setDescription(e.target.value)}
                          required={true}
                                />{" "}
                              
                              </Label>
                            </FormGroup>
                          </FormGroup>
                        </FormGroup>

                       
                        <FormGroup style={{ marginBottom: "0px" }}>
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <div className="card" style={{marginLeft:"15px",width:"1630px"}}>
            <header className="panel_header">
                  <h2 className="title float-left" style={{marginLeft:"35px"}}>FAQ'S LIST</h2>
                </header>
            {FAQList.map((info, i) => (
            <div class="accordion accordion-flush" id="accordionFlushExample" >
  <div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne" style={{width:"1570px"}}>
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#flush-collapseOne${i}`} aria-expanded="false" aria-controls="flush-collapseOne" style={{marginLeft:"14px"}}>
       {info.title}
      </button>
    </h2>
    <div id={`flush-collapseOne${i}`} class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample" stytle={{marginBottom:"15px"}}>
      <div class="accordion-body" style={{marginLeft:"15px"}}>{info.answer}</div>
    </div>
  </div>
  
</div>
  ))}
 </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default FaqAdd