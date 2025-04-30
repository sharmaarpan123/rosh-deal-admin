import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import ReactSelectNoOptionMessage from "../../../../../components/Common/ReactSelectNoOptionMessage";
import SearchFilter from "../../../../../components/Common/SearchFilter";
import StatusFilter from "../../../../../components/Common/StatusFilter";
import { BRAND_LIST, SUB_ADMIN_LIST } from "../../../../../services/ApiCalls";
import { slotCompletedStatusOptions } from "../../../../../utilities/const";
import styles from "../Filters/DealFilter.module.scss";
import { Link, useLocation } from "react-router-dom";

const Filter = ({
  statusFilterOptionArr,
  setBody,
  body,
  searchHandler,
  showBrandFilter = true,
  showMediatorFilter = false,
}) => {
  const platforms = useSelector((s) => s?.platform?.data);
  const [selectedBrandOptions, setSelectedBrandOptions] = useState([]);
  const [platformsOptions, setPlatFormsOptions] = useState([]);
  const location = useLocation();
  const [selectedMediator, setSelectedMediator] = useState({
    label: "",
    value: "",
  });

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
    setSelectedMediator({ label: "", value: "" });
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

  const loadMediatorsOptions = async (inputValue, callback) => {
    const response = await SUB_ADMIN_LIST({ search: inputValue });
    if (response) {
      const options = response?.data?.data?.map((item) => ({
        value: item._id,
        label: item.name,
      }));
      callback(options);
      if (!!!options.length) {
        setBody((p) => ({
          ...p,
          mediatorId: "",
        }));
        setSelectedMediator({ label: "", value: "" });
      }
    } else {
      callback([]);
      setBody((p) => ({
        ...p,
        mediatorId: "",
      }));
      setSelectedMediator({});
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

  const handleMediatorChange = (option) => {
    setSelectedMediator(option);
    setBody((p) => ({
      ...p,
      mediatorId: option?.value,
    }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between w-100">
        <ul className="list-unstyled ps-0 mb-0 d-flex align-items-end gap-10 flex-wrap">
          <li className="d-flex flex-column align-items-center ">
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

          <li className="d-flex align-items-center flex-column ">
            <label
              htmlFor=""
              className="form-label m-0 fw-sbold text-muted"
              style={{ whiteSpace: "nowrap" }}
            >
              Slot Completed Status
            </label>
            <StatusFilter
              body={body}
              setBody={setBody}
              statusKey={"isSlotCompleted"}
              statusFilterOptionArr={slotCompletedStatusOptions}
            />
          </li>
        </ul>

        {addLinkButtons && (
          <ul className="list-unstyled ps-0 mb-0 d-flex align-items-end gap-10 flex-wrap">
            <li className="">
              <Link
                to={"/deal/bulk-add"}
                className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                style={{ height: 40, minWidth: 100, fontSize: 12 }}
              >
                Bulk Add
              </Link>
            </li>
            <li className="">
              <Link
                to={"/deal/add"}
                className="d-flex btn btn-primary align-items-center justify-content-center fw-sbold commonBtn"
                style={{ height: 40, minWidth: 100, fontSize: 12 }}
              >
                Add New
              </Link>
            </li>
          </ul>
        )}
      </div>

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

        {showBrandFilter && (
          <li className="d-flex align-items-center flex-column ">
            <label
              htmlFor=""
              className="form-label m-0 fw-sbold text-muted"
              style={{ whiteSpace: "nowrap" }}
            >
              Brands
            </label>
            <AsyncSelect
              loadOptions={loadOptions}
              onChange={handleChange}
              value={selectedBrandOptions}
              className={`${styles.select}`}
              isClearable
              components={{
                NoOptionsMessage: (props) => (
                  <ReactSelectNoOptionMessage
                    message="Search Brands"
                    {...props}
                  />
                ),
              }}
            />
          </li>
        )}

        {showMediatorFilter && (
          <li className="d-flex flex-column align-items-center ">
            <label
              htmlFor=""
              className="form-label m-0 fw-sbold text-muted"
              style={{ whiteSpace: "nowrap" }}
            >
              Mediator
            </label>
            <AsyncSelect
              components={{
                DropdownIndicator: () => null,
                IndicatorSeparator: () => null,
                NoOptionsMessage: (props) => (
                  <ReactSelectNoOptionMessage
                    message="search your Mediator name"
                    {...props}
                  />
                ),
              }}
              placeholder="Search Mediator"
              loadOptions={loadMediatorsOptions}
              onChange={handleMediatorChange}
              value={selectedMediator}
              className={`${styles.select}`}
              isClearable
            />
          </li>
        )}

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

export default Filter;
