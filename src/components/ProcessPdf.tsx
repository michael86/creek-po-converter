import { FormEvent, useRef } from "react";
import axios from "axios";

const ProcessPdf = () => {
  const ref = useRef<HTMLInputElement>(null);

  const onClick = async (e: FormEvent) => {
    e.preventDefault();

    if (!ref.current || !ref.current.files) return;
    const file = ref.current.files[0];
    console.log("ya yeet");
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("pdf", file);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        console.log("begin upload");

        const result = await axios.post("http://127.0.0.1:6005/pdf/process", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("result", result);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <form>
        <input type="file" name="pdf" id="pdf" ref={ref} />
        <button onClick={onClick}>Upload</button>
      </form>
    </>
  );
};

export default ProcessPdf;
