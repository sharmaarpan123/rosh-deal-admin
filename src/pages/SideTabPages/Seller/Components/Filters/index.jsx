import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ReactSelectNoOptionMessage from "../../../../../components/Common/ReactSelectNoOptionMessage";
import SearchFilter from "../../../../../components/Common/SearchFilter";
import StatusFilter from "../../../../../components/Common/StatusFilter";
import { BRAND_LIST } from "../../../../../services/ApiCalls";
import { slotCompletedStatusOptions } from "../../../../../utilities/const";
import styles from "../Filters/DealFilter.module.scss";
import { Link, useLocation } from "react-router-dom";

const SellerDealFilter = ({
  statusFilterOptionArr,
  setBody,
  body,
  searchHandler,
  showBrandFilter = true,
}) => {
  const platforms = useSelector((s) => s?.platform?.data);
  const [selectedBrandOptions, setSelectedBrandOptions] = useState([]);
  const [platformsOptions, setPlatFormsOptions] = useState([]);
  const location = useLocation();

  const addLinkButtons = location.pathname === "/myDealsAsAgency";

  const clearFilter = () => {
    setBody((p) => ({
      ...p,
      paymentStatus: "",
      isSlotCompleted: "",
      status: "1",
      search: "",
      page: 1,
      offset: 0,
      limit: 10,
      selectedBrandFilter: [],
      selectedPlatformFilter: [],
    }));
    setSelectedBrandOptions([]);
  };

  const loadOptions = async (inputValue, callback) => {
    setBody((p) => ({
      ...p,
      selectedBrandFilter: [],
    }));
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
        setSelectedBrandOptions({ label: "", value: "" });
      }
    } else {
      callback([]);
      setBody((p) => ({
        ...p,
        brandId: "",
      }));
      setSelectedBrandOptions({});
    }
  };

  const handleChange = (option) => {
    setSelectedBrandOptions(option);
    setBody((p) => ({
      ...p,
      selectedBrandFilter: option?.value ? [option?.value] : [],
    }));
  };

  useEffect(() => {
    const options =
      platforms?.map((i) => ({ label: i.name, value: i._id })) || [];

    setPlatFormsOptions(options);
  }, [platforms]);

  return (
    <div>
      <ul className="list-unstyled ps-0 mb-0 d-flex align-items-end gap-10 flex-wrap">
        <li className="d-flex align-items-center flex-column ">
          <label
            htmlFor=""
            className="form-label m-0 fw-sbold text-muted"
            style={{ whiteSpace: "nowrap" }}
          >
            Platforms
          </label>
          <Select
            options={platformsOptions}
            isMulti
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

        <li className="">
          <SearchFilter
            body={body}
            setBody={setBody}
            searchHandler={searchHandler}
          />
        </li>

        <li>
          <Button className="commonBtn" type="button" onClick={clearFilter}>
            Clear
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SellerDealFilter;
