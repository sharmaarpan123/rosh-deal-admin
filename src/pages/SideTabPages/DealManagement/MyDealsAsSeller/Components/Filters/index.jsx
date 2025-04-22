import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Select from "react-select";
import SearchFilter from "../../../../../../components/Common/SearchFilter";
import StatusFilter from "../../../../../../components/Common/StatusFilter";
import { slotCompletedStatusOptions } from "../../../../../../utilities/const";
import styles from "../Filters/DealFilter.module.scss";


const DealsAsSellerFilter = ({
  statusFilterOptionArr,
  setBody,
  body,
  searchHandler,
}) => {
  const platforms = useSelector((s) => s?.platform?.data);

  const [platformsOptions, setPlatFormsOptions] = useState([]);


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

 


  useEffect(() => {
    const options =
      platforms?.map((i) => ({ label: i.name, value: i._id })) || [];

    setPlatFormsOptions(options);
  }, [platforms]);

  return (
    <div>
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

export default DealsAsSellerFilter;
