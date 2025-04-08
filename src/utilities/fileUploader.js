import { toast } from "react-toastify";
import { UPLOAD_FILE } from "../services/ApiCalls";

export default async (file) => {
  try {
    const allowedExtensions = ["svg", "jpg", "png", "jpeg"];
    const fileType = file.type.split("/")[1]; // Get the file extension
    if (!allowedExtensions.includes(fileType)) {
      toast.error(
        "Unsupported file type. Please upload only SVG, JPG, JPEG, or PNG files."
      );
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await UPLOAD_FILE(formData);
    if (res?.data?.success) {
      return res?.data?.data;
    } else {
      toast.dismiss();
      toast.error(res.data.message);
      return false;
    }
  } catch (error) {
    toast.dismiss();
    toast.error("something went wrong while uploading image");
    console.log(error);
    return false;
  }
};
