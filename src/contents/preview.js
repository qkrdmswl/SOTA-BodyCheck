import React, { useState } from 'react';

class Preview extends React.Component {
  state = { selectedFiles: null };
  componentDidUpdate = prevState => {
    if (prevState.selectedFiles !== this.state.selectedFiles) {
      this.renderPreviews();
    }
  };

  renderPreviews = () => {
    const { selectedFiles } = this.state;
    const previewContainer = document.getElementById("preview-container");
    for (let i = 0; i < selectedFiles.length; i++) {
      const preview = document.createElement("img");
      preview.id = `preview_${i}`;
      previewContainer.appendChild(preview);
      const reader = new FileReader();
      reader.onload = function(evt) {
        preview.src = reader.result;
      };
      reader.readAsDataURL(selectedFiles[i]);
    }
  };
  fileChangedHandler = event => {
    const files = event.target.files;
    this.setState({
      selectedFiles: files
    });
  };
  render() {
    return (
      <div className="Preview" style={{"marginTop": "10px"}}>
        <input type="file" multiple onChange={this.fileChangedHandler} />
        <p></p>
        <div id="preview-container" style={{"width":"500px", "height":"250px"}} />
        
      </div>
    );
  }
}

export default Preview;