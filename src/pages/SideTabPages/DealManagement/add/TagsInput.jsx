/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";

const TagsInput = ({ setValue, watch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const AddTagHandler = () => {
    if (!inputValue.trim()) {
      toast.dismiss();
      toast.warning("abe chutiye kuch likh to sahi!");
    }
    setValue("productCategories", [
      ...watch("productCategories"),
      inputValue.trim(),
    ]);
    setInputValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.ctrlKey && inputValue.trim() !== "") {
      setValue("productCategories", [
        ...watch("productCategories"),
        inputValue.trim(),
      ]);
      setInputValue("");
    } else if (
      event.key === "Enter" &&
      event.ctrlKey &&
      inputValue.trim() === ""
    ) {
      // just fun
      toast.dismiss();
      toast.warning("abe chutiye kuch likh to sahi!");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    setValue(
      "productCategories",
      watch("productCategories").filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <div
      className=" border border-primary bg-white rounded  d-flex align-items-center p-2  "
      style={{
        minHeight: 45,
      }}
    >
      <ul className="d-flex flex-wrap p-0 list-unstyled d-flex w-100 h-100 mb-0 ">
        {watch("productCategories")?.map((item, ind) => (
          <li
            key={ind}
            className="d-flex align-items-center  px-2 border border-danger rounded mx-2"
          >
            {item}
            <span
              style={{
                width: 15,
                height: 20,
                fontSize: 10,
              }}
              onClick={() => handleRemoveTag(ind)}
              className="ms-1  bg-black text-white rounded d-flex justify-content-center  d-flex align-items-center"
            >
              X
            </span>
          </li>
        ))}
        <li>
          <input
            type="text"
            placeholder="Annette Black"
            className="form-control border-white focus-border-none"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={{
              height: 30,
            }}
          />
        </li>
      </ul>
      <button onClick={AddTagHandler}>Add</button>
    </div>
  );
};

export default TagsInput;
