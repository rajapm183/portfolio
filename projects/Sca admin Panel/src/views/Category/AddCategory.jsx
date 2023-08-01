import React, { useState, useEffect, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import Cropper from "../Cropper";
import CategoryList from "./CategoryList";
import Select from "react-select";
import NotificationAlert from "react-notification-alert";
import api from "../../Axios";
import TagsInput from "react-tagsinput";
import { customStyles } from "../../assets/css/CustomStyles";

const AddCategory = (props) => {
  const notiRef = useRef();
  const [data, setData] = useState({
    categoryName: "",
    image: "",
    taxId: "",
    taxName: "",
    taxPercentage: "",
  });
  const [spec, setSpec] = useState({
    productTitle: [],
    // categoryName:'',
    categoryId: "",
  });
  const [cateName, setCateName] = useState();
  const [taxlist, setTaxlist] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [render, setRender] = useState(false);

  // Tax name
  useEffect(() => {
    const getTax = () => {
      api
        .post("/admin/shop/tax")
        .then((res) => {
          // console.log(res.data.data);
          if (res.data.data != "No Taxes found") {
            setTaxlist(
              res.data.data.map((data) => {
                return {
                  label: data.taxName,
                  value: data.id,
                  taxPercentage: data.taxPercentage,
                  taxId: data.id,
                };
              })
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getTax();
  }, [props.taxRender]);

  // Category Name
  useEffect(() => {
    api
      .get("/admin/product/getCategory")
      .then((res) => {
        if (res.data.data != "No Categories Found") {
          setCategoryList(
            res.data.data.map((data) => {
              return {
                label: data.categoryName,
                value: data.id,
              };
            })
          );
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
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

  function handleImageChange(e) {
    console.log("image", e);
    setData({ ...data, image: e });
  }

  function handleChange(e) {
    if (e.label) {
      console.log(e);
      setData({
        ...data,
        taxId: e.taxId,
        taxName: e.label,
        taxPercentage: e.taxPercentage,
      });
    } else setData({ ...data, [e.target.name]: e.target.value });
  }

  function setTags(e) {
    console.log(e);
    setSpec({ ...spec, productTitle: e });
  }

  function specChange(e) {
    console.log(e);
    setCateName(e.label);
    setSpec({
      ...spec,
      // categoryName:categoryList[e.target.value].categoryName,
      categoryId: e.value,
    });
  }

  function specSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    console.log(spec);
    api
      .post("/admin/product/addTitle", spec)
      .then((res) => {
        console.log(res.data.data);
        notify(res.data.data, "success");
        setSpec({
          productTitle: [],
          categoryId: "",
        });
      })
      .catch((err) => {
        console.log(err, "danger");
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.currentTarget.reset();
    // console.log(data);
    const formdata = new FormData();
    Object.entries(data).map((data) => {
      formdata.append(data[0], data[1]);
    });
    api
      .post("/admin/product/addCategory", formdata)
      .then((res) => {
        console.log(res);
        notify(res.data.data, "success");
        setData("");
        setRender(!render);
      })
      .catch((err) => {
        console.log(err);
        notify(err, "danger");
      });
  }

  function checkArray(tax) {
    if (Array.isArray(tax)) return tax;
    else return [];
  }

  return (
    <div>
      <div className="notification-popup">
        <NotificationAlert ref={notiRef} />
      </div>
      <Row>
        {/* <Col> */}
        <div className="col-12">
          <section className="box ">
            <header className="panel_header">
              <h2 className="title float-left">Add Category</h2>
            </header>
           
            <div className="content-body">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="exampleEmail7">Category Name</Label>
                      <Input
                        type="text"
                        name="categoryName"
                        id="exampleEmail7"
                        onChange={handleChange}
                        placeholder=""
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="exampleFile">Category Image</Label>
                      <Cropper
                        imageStore={handleImageChange}
                        aspectRatio={1 / 1}
                        reset={render}
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label htmlFor="exampleSelect3">Tax Name</Label>
                      <Select
                        name="taxName"
                        className="select2"
                        options={taxlist}
                        styles={customStyles}
                        onChange={handleChange}
                      />
                      {/* <Input
                        type="select"
                        name="taxName"
                        id="exampleSelect3"
                        onChange={handleChange}
                        required
                        style={{ textTransform: "capitalize" }}
                      >
                        <option>Choose a Tax Name</option>
                        {checkArray(taxlist).length > 0 ? (
                          taxlist.map((data, index) => (
                            <option value={index}>{data.taxName}</option>
                          ))
                        ) : (
                          <option>No DATA</option>
                        )}
                      </Input> */}
                    </FormGroup>

                    <FormGroup style={{ marginBottom: "0px" }}>
                      <button className="btn btn-primary" style={{backgroundColor:"#0a9a73"}}>Submit</button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/*__________ ADD SPECIFICATIONS _________________*/}

        <div className="col-12">
          <section className="box ">
            <header className="panel_header">
              <h2 className="title float-left">Add Specifications</h2>
            </header>
            <div className="content-body">
              <div className="row">
                <div className="col-12 col-sm-12 col-md-10 col-lg-10 col-xl-8">
                  <Form onSubmit={specSubmit}>
                    <FormGroup>
                      <Label htmlFor="exampleSelect3">Category Name</Label>
                      <Select
                        name="cateName"
                        className="select2"
                        options={categoryList}
                        styles={customStyles}
                        onChange={specChange}
                      />
                    </FormGroup>

                    {cateName ? (
                      <FormGroup>
                        <Label htmlFor="exampleText">Specification Title</Label>
                        <div className="form-group">
                          <div className="controls">
                            <TagsInput
                              value={spec.productTitle}
                              name="tag"
                              onChange={setTags}
                              onlyUnique={true}
                              placeholder="Add Specification Title"
                              required
                            />
                          </div>
                        </div>
                      </FormGroup>
                    ) : (
                      ""
                    )}

                    <FormGroup style={{ marginBottom: "0px" }}>
                      <button className="btn btn-primary" style={{backgroundColor:"#0a9a73"}}>Submit</button>
                    </FormGroup>
                  </Form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <CategoryList render={render} />
        {/* </Col> */}
      </Row>
    </div>
  );
};

export default AddCategory;
