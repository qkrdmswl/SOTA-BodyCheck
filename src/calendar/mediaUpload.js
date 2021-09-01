import React, { Component } from "react";
import "./mediaUpload.css";

export class Media extends Component {
  state = {
    profileImg: "https://www.analogouscolors.com/image/1080x1920/dcdcdc.png",
  };
  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  render() {
    const { profileImg } = this.state;
    return (
      <div className="page">
        <div className="container">
          <h5 className="heading">미디어 업로드</h5>
          <div className="img-holder">
            <img src={profileImg} alt="" id="img" className="img" />
          </div>
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            onChange={this.imageHandler}
          />
          <div className="label">
            <label className="image-upload" htmlFor="input">
              이미지 업로드
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default Media;