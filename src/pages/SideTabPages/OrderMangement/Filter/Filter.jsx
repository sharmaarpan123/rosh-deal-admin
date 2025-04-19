import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import StatusFilter from "../../../../components/Common/StatusFilter";
import CrossIcon from "../../../../components/icons/svg/CrossIcon";
import {
  BRAND_LIST,
  DEAL_BY_BRAND_ID,
  SUB_ADMIN_LIST,
} from "../../../../services/ApiCalls";
import { errorToast } from "../../../../utilities/utilities";
import styles from "./Filter.module.scss";
// css

import ReactSelectNoOptionMessage from "../../../../components/Common/ReactSelectNoOptionMessage";
import Calendar from "../../../../components/icons/svg/Calendar";
import DateRangeModal from "../../../../components/Common/DateRangeModal";

const Filter = ({
  statusFilterOptionArr,
  setBody,
  body,
  showMediatorFilter = false,
  dealByBrandIdApiAccessingAs,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const [selectedMediator, setSelectedMediator] = useState({
    label: "",
    value: "",
  });

  console.log(selectedMediator, "asfl;dsakj");

  const [selectedDealOption, setSelectedDealOption] = useState([]);

  const [platformsOptions, setPlatFormsOptions] = useState([]);

  const platforms = useSelector((s) => s?.platform?.data);

  const [showDateModal, setShowDateModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

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

  const handleMediatorChange = (option) => {
    setSelectedMediator(option);
    setBody((p) => ({
      ...p,
      mediatorId: option?.value,
    }));
  };

  const handleApplyDateFilter = () => {
    if (dateRange.startDate && dateRange.endDate) {
      setBody((prev) => ({
        ...prev,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      }));
    }
    setShowDateModal(false);
  };

  const clearFilter = () => {
    setBody((p) => ({
      ...p,
      brandId: "",
      mediatorId: "",
      dealId: [],
      status: "",
      startDate: "",
      endDate: "",
      page: 1,
      offset: 0,
      limit: 10,
      selectedPlatformFilter: [],
    }));

    setSelectedOption({ label: "", value: "" });
    setSelectedMediator({ label: "", value: "" });
    setSelectedDealOption([]);
    setDateRange({ startDate: null, endDate: null });
  };

  const handleDateFilterChange = (date, keyName) => {
    setDateRange((prev) => ({ ...prev, [keyName]: date }));
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
          Platforms
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
            // DropdownIndicator: () => null,
            // IndicatorSeparator: () => null,
            NoOptionsMessage: (props) => (
              <ReactSelectNoOptionMessage message="Search Brands" {...props} />
            ),
          }}
          placeholder="Search Brands"
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
            NoOptionsMessage: (props) => (
              <ReactSelectNoOptionMessage message="Search Deals" {...props} />
            ),
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
        <Button
          className="bg-transparent text-muted px-3 d-flex align-items-center gap-2"
          type="button"
          onClick={() => setShowDateModal(true)}
          style={{
            minWidth: 40,
            height: 40,
          }}
        >
          <Calendar />
          {dateRange.startDate && dateRange.endDate ? (
            <span style={{ fontSize: "12px" }}>
              {`${dateRange.startDate.toLocaleDateString(
                "en-GB"
              )} - ${dateRange.endDate.toLocaleDateString("en-GB")}`}
            </span>
          ) : (
            "Select Date"
          )}
        </Button>
      </li>

      <li>
        <Button
          className="commonBtn px-0"
          type="button"
          style={{
            minWidth: 40,
            height: 40,
          }}
          onClick={clearFilter}
        >
          <CrossIcon />
        </Button>
      </li>

      <DateRangeModal
        show={showDateModal}
        onHide={() => setShowDateModal(false)}
        startDate={dateRange.startDate}
        endDate={dateRange.endDate}
        onStartDateChange={(date) => handleDateFilterChange(date, "startDate")}
        onEndDateChange={(date) => handleDateFilterChange(date, "endDate")}
        onApply={handleApplyDateFilter}
      />
    </ul>
  );
};

export default Filter;
