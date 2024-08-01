import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import StatusFilter from "../../../../components/Common/StatusFilter";
import { BRAND_LIST, DEAL_BY_BRAND_ID } from "../../../../services/ApiCalls";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import styles from "./Filter.module.scss";
import { catchAsync, checkResponse } from "../../../../utilities/utilities";

const Filter = ({ statusFilterOptionArr, setBody, body }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "",
    value: "",
  });

  const [selectedDealOption, setSelectedDealOption] = useState([]);
  const [getDealsOptionLoader, setGetDealsOptionsLOader] = useState(false);
  const [DealsOption, setDealsOptions] = useState([]);

  const loadOptions = async (inputValue, callback) => {
    const response = await BRAND_LIST({ search: inputValue });
    if (response) {
      const options = response?.data?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      callback(options);
      if (!!!options.length) {
        setBody((p) => ({
          ...p,
          brandId: "",
        }));
        setSelectedOption({ label: "", value: "" });
      }
    } else {
      callback([]);
      setBody((p) => ({
        ...p,
        brandId: "",
      }));
      setSelectedOption({});
    }
  };

  const handleChange = (option) => {
    setSelectedOption(option);
    setBody((p) => ({
      ...p,
      brandId: option?.value,
    }));
  };

  const clearFilter = () => {
    setBody((p) => ({
      ...p,
      brandId: "",
      dealId: [],
      status: "",
      page: 1,
      offset: 0,
      limit: 10,
    }));
    setDealsOptions([]);
    setSelectedOption({ label: "", value: "" });
    setSelectedDealOption([]);
  };

  const getDealsByBrandId = catchAsync(async (id) => {
    if (!id) {
      setDealsOptions([]);
      return;
    }

    console.log(id, "Data id");

    setGetDealsOptionsLOader(true);
    const res = await DEAL_BY_BRAND_ID(id);

    checkResponse({
      res,
      setLoader: setGetDealsOptionsLOader,
      setData: (data) => {
        setDealsOptions(
          data?.map((item) => ({ label: item.productName, value: item._id }))
        );
      },
    });
  });

  useEffect(() => {
    getDealsByBrandId(body.brandId);
  }, [body.brandId]);

  console.log(body, "body");

  return (
    <ul className="list-unstyled ps-0 mb-0 d-flex align-items-end gap-10 flex-wrap">
      <li className="d-flex flex-column align-items-center gap-10">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Status
        </label>
        <StatusFilter
          body={body}
          setBody={setBody}
          statusKey={"status"}
          statusFilterOptionArr={statusFilterOptionArr}
        />
      </li>
      <li className="d-flex flex-column align-items-center gap-10">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Brand
        </label>
        <AsyncSelect
          loadOptions={loadOptions}
          onChange={handleChange}
          value={selectedOption}
          className={`${styles.select}`}
          isClearable
        />
      </li>

      <li className="d-flex flex-column align-items-center gap-10">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Deals
        </label>
        <Select
          isLoading={getDealsOptionLoader}
          options={DealsOption}
          value={selectedDealOption}
          isMulti
          isClearable
          onChange={(value) => {
            setSelectedDealOption(value);
            setBody((p) => ({
              ...p,
              dealId: value?.map((i) => i.value),
            }));
          }}
        />
      </li>

      <li>
        <Button className="commonBtn" type="button" onClick={clearFilter}>
          Clear
        </Button>
      </li>
    </ul>
  );
};

export default Filter;
