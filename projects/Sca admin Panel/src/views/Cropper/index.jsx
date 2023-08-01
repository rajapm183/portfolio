import ReactDOM from "react-dom";
import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import api from "../../Axios";
import Swal from "sweetalert2";
import "./style.css";

// import './App.css';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  state = {
    src: null,
    crop: {
      unit: "%",
      width: 30,
      aspect: this.props.aspectRatio,
    },
    selectedImg: "",
  };
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  componentDidUpdate = (prevprops, nextprops) => {
    if (this.props.reset !== prevprops.reset) {
      this.setState({ ...this.state, src: "", croppedImageUrl: "" });
    }
  };
  AddImage = (val) => {
    var formData = new FormData();
    console.log(this.state.selectedImg);
    formData.append("variantImage", this.state.selectedImg);
    api
      .post("/admin/product/uploadImage", formData)
      .then((res) => {
        Swal.fire({
          title: "Checking...",
          icon: "info",
          text: "Please wait",
          // imageUrl: "images/ajaxloader.gif",
          showConfirmButton: false,
          allowOutsideClick: false,
        });

        //using setTimeout to simulate ajax request
        setTimeout(() => {
          Swal.fire({
            icon: "success",
            title: "Image Added successfully!",
            showConfirmButton: false,
            timer: 1000,
          });
        }, 2000);

        this.props.imageStore(this.props.index, res.data.data);
      })
      .catch((err) => {
        console.log(err)
        setTimeout(() => {
          Swal.fire({
            icon: "error",
            title: "Image Added Failed!",
            showConfirmButton: false,
            timer: 1000,
          });
        }, 2000);
      });
  };
  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg",
        true
      );
      var file = new File([croppedImageUrl], "IMG" + Date.now() + ".png", {
        type: "image/png",
      });
      const croppedImage = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg",
        false
      );
      if (this.props.index || this.props.index == 0)
        this.setState({ ...this.state, selectedImg: file });
      else this.props.imageStore(file);
      this.setState({ croppedImageUrl: croppedImage });
    }
  }

  getCroppedImg(image, crop, fileName, blob) {
    const canvas = document.createElement("canvas");
    const pixelRatio = window.devicePixelRatio;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
    if (blob)
      return new Promise((resolve, reject) => {
        canvas.toBlob((file) => resolve(file));
      });
    else {
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              //reject(new Error('Canvas is empty'));
              console.error("Canvas is empty");
              return;
            }
            blob.name = fileName;
            window.URL.revokeObjectURL(this.fileUrl);
            this.fileUrl = window.URL.createObjectURL(blob);
            resolve(this.fileUrl);
          },
          "image/jpeg",
          1
        );
      });
    }
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    console.log(croppedImageUrl);
    return (
      <div className="App">
        <div>
          <input
            id="file"
            type="file"
            accept="image/*"
            onChange={this.onSelectFile}
            style={{ width: "100%", cursor: "pointer" }}
          />
        </div>
        <div className="row">
          <div className="col-lg-6">
            {src && (
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={this.onImageLoaded}
                onComplete={this.onCropComplete}
                onChange={this.onCropChange}
              />
            )}
          </div>
          <div className="col-lg-6">
            {croppedImageUrl && (
              <div>
                <h4 style={{ textAlign: "center" }}> Preview</h4>
                <img
                  alt="Crop"
                  style={{ maxWidth: "100%" }}
                  src={croppedImageUrl}
                />
              </div>
            )}
          </div>
        </div>

        <div style={{ margin: "20px", cursor: "pointer" }}>
          {this.props.index || this.props.index == 0 ? (
            <span className="Butt" onClick={this.AddImage}>
              Add Image
            </span>
          ) : (
            false
          )}
        </div>
      </div>
    );
  }
}

export default App;
