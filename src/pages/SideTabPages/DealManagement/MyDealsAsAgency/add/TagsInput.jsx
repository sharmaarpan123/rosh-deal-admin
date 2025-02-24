/* eslint-disable react/prop-types */
import { useState } from "react";
import { toast } from "react-toastify";

const TagsInput = ({ setValue, watch, fieldName }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const AddTagHandler = () => {
    if (!inputValue.trim()) {
      toast.dismiss();
      return toast.warning("Please write something to add the tag!");
    }

    let arr = [];

    if (watch(fieldName)) {
      arr = [...watch(fieldName)];
    }

    arr.push(inputValue.trim());

    setValue(fieldName, arr, { shouldValidate: true });
    setInputValue("");
  };


  const handleRemoveTag = (indexToRemove) => {
    setValue(
      fieldName,
      watch(fieldName).filter((_, index) => index !== indexToRemove)
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
        {watch(fieldName)?.map((item, ind) => (
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
                cursor: "pointer",
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
            placeholder="Add Categories"
            className="form-control border-white focus-border-none"
            value={inputValue}
            onChange={handleInputChange}
            style={{
              height: 30,
            }}
          />
        </li>
      </ul>
      <button onClick={AddTagHandler} type="button">
        Add
      </button>
    </div>
  );
};

export default TagsInput;
