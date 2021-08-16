<script type="module">
    import * as React from "https://cdn.skypack.dev/react@17.0.1";
</script>

function media() {
  
  const handleFileChange = (e) => {
    console.log("handle file change called");
    const files = e.target.files;
    console.log(files);
    const filesArr = Array.prototype.slice.call(files);
    console.log(filesArr);
  }


  return (
    <input
      id="fileUpolad"
      type="file"
      onChange={handleFileChange}
      multiple
    />
  );
}

export default media;