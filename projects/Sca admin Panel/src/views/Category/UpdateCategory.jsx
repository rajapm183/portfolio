import React, { useEffect, useState, useRef } from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import Cropper from "../Cropper";
import {} from "components";
import { useParams } from "react-router-dom";
import api from "../../Axios";
import NotificationAlert from "react-notification-alert";

const UpdateCategory = () => {
  const param = useParams();
  const notiRef = useRef();
  // console.log(param);
  const [data, setData] = useState({
    categoryName: "",
    categoryImage: "",
    taxPercentage: "",
    categoryId: null,
  });
  const [convertedImage, setConvertedImage] = useState("");
  const [GetImage, SetGetImage] = useState("");
  const [reset, setReset] = useState(false);

  const categoryId = param.id;

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
    var redirect=type==='success'?
    setTimeout(()=>window.location.href = "/category", 1500):'';
  }

  function getApiData() {
    api
      .get("/admin/product/getCategory", {
        params: { categoryId: categoryId || null },
      })
      .then((res) => {
        console.log("Datas", res.data.data);
        setData(res.data.data);
        SetGetImage(res.data.data.categoryImage);
      })
      .catch((err) => {
        console.log(err.response);
        notify(err.response.data.error.message, "danger");
      });
  }

  useEffect(() => {
    getApiData();
  }, []);

  useEffect(() => {
    if (convertedImage) SetGetImage(URL.createObjectURL(convertedImage));
  }, [convertedImage]);

  function handleChange(e) {
    // if (e.target.files) setData({ ...data, [e.target.name]: e.target.files });
    setData({ ...data, [e.target.name]: e.target.value });
  }

  // function handleImageChange(i, e) {
  //   // console.log('image',e.name);
  //   setData({ ...data, categoryImage: e });
  // }

  function handleSubmit(e) {
    e.preventDefault();
    setData({ ...data, categoryImage: convertedImage });
    console.log("submit", data);
    const final = {
      categoryName: data.categoryName,
      image: convertedImage,
      taxPercentage: data.taxPercentage,
      categoryId: categoryId,
    };
    const formdata = new FormData();
    Object.entries(final).map((data) => {
      formdata.append(data[0], data[1]);
    });
    api.post("/admin/product/updateCategory", formdata).then((res) => {
      console.log(res);
      notify(res.data.data, "success");
      setReset(!reset);
      setData("");
    });
  }
  // console.log(data);

  return (
    <div>
      <div className="notification-popup">
        <NotificationAlert ref={notiRef} />
      </div>
      <div className="content">
        <Row>
          <Col xs={12} md={12}>
            <div className="page-title">
              <div className="float-left">
                <h1 className="title">Category</h1>
              </div>
            </div>

            <div className="col-12">
              <section className="box ">
                <header className="panel_header">
                  <h2 className="title float-left">Update Category</h2>
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
                            value={data.categoryName}
                            className="update-cate"
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="exampleFile">Category Image</Label>
                          <br />
                          <img
                            src={"https://api.bioforhealth.in" + GetImage}
                            width={130}
                            height={130}
                            alt="img"
                          />
                          <Cropper
                            imageStore={setConvertedImage}
                            image={convertedImage}
                            aspectRatio={1 / 1}
                            reset={reset}
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label htmlFor="exampleEmail7">Tax Percentage</Label>
                          <Input
                            type="number"
                            name="taxPercentage"
                            id="exampleEmail7"
                            onChange={handleChange}
                            value={data.taxPercentage}
                          />
                        </FormGroup>

                        <FormGroup style={{ marginBottom: "0px" }}>
                          <button type="submit" className="btn btn-primary">
                            Update
                          </button>
                        </FormGroup>
                      </Form>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default UpdateCategory;
