import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import StatusFilter from "../../../../components/Common/StatusFilter";
import { BRAND_LIST, DEAL_BY_BRAND_ID } from "../../../../services/ApiCalls";
import { errorToast } from "../../../../utilities/utilities";
import styles from "./Filter.module.scss";

const Filter = ({
  statusFilterOptionArr,
  setBody,
  body,
  dealByBrandIdApiAccessingAs,
}) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "",
    value: "",
  });

  const [selectedDealOption, setSelectedDealOption] = useState([]);

  const [platformsOptions, setPlatFormsOptions] = useState([]);

  const platforms = useSelector((s) => s?.platform?.data);

  useEffect(() => {
    const options =
      platforms?.map((i) => ({ label: i.name, value: i._id })) || [];

    setPlatFormsOptions(options);
  }, [platforms]);

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

  const loadDealOptions = async (inputValue, callback) => {
    if (!body.brandId)
      return errorToast({ message: "Please select Brand First" });
    if (inputValue?.trim()?.length < 4) return;

    const response = await DEAL_BY_BRAND_ID({
      brandId: body?.brandId,
      search: inputValue?.trim(),
      apiAccessingAs: dealByBrandIdApiAccessingAs,
    });
    if (response) {
      const options = response?.data?.data?.map((item) => ({
        value: item._id,
        label: item?.parentDealId?.productName || item?.productName,
      }));
      callback(options);
      if (!!!options.length) {
        setBody((p) => ({
          ...p,
          dealId: [],
        }));
        setSelectedDealOption([]);
      }
    } else {
      callback([]);
      setBody((p) => ({
        ...p,
        dealId: [],
      }));
      setSelectedDealOption([]);
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
      selectedPlatformFilter: [],
    }));

    setSelectedOption({ label: "", value: "" });
    setSelectedDealOption([]);
  };

  return (
    <ul className="list-unstyled ps-0 mb-0 d-flex align-items-end gap-10 flex-wrap">
      <li className="d-flex flex-column align-items-center">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Order Status
        </label>
        <StatusFilter
          body={body}
          setBody={setBody}
          statusKey={"orderFormStatus"}
          statusFilterOptionArr={statusFilterOptionArr}
        />
      </li>
      <li className="d-flex align-items-center flex-column ">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          PlatForms
        </label>
        <Select
         components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
          options={platformsOptions}
          isMulti
          placeholder="Search Platform"
          className={`${styles.select}`}
          isClearable
          value={
            platformsOptions?.filter((i) =>
              body?.selectedPlatformFilter?.includes(i.value)
            ) || []
          }
          onChange={(platform) =>
            setBody((p) => ({
              ...p,
              selectedPlatformFilter: platform?.map((i) => i.value) || [],
            }))
          }
        />
      </li>
      <li className="d-flex flex-column align-items-center ">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Brand
        </label>
        <AsyncSelect
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          placeholder="Search Brand"
          loadOptions={loadOptions}
          onChange={handleChange}
          value={selectedOption}
          className={`${styles.select}`}
          isClearable
        />
      </li>

      <li className="d-flex flex-column align-items-center">
        <label
          htmlFor=""
          className="form-label m-0 fw-sbold text-muted"
          style={{ whiteSpace: "nowrap" }}
        >
          Deals
        </label>
        <AsyncSelect
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
          className={`${styles.select}`}
          loadOptions={loadDealOptions}
          value={selectedDealOption}
          isMulti
          isClearable
          placeholder="Search Deal"
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
