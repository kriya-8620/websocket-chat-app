import axios from "axios";

function FileUpload() {

  const uploadFile =
    async (e) => {

      const file =
        e.target.files[0];

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      await axios.post(
        "http://localhost:5000/api/upload",
        formData
      );

    };

  return (

    <input
      type="file"
      onChange={uploadFile}
    />

  );

}

export default FileUpload;