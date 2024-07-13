import React from "react";
import { Button } from "react-bootstrap";

const SearchFilter = ({ body, setBody, searchHandler }) => {
  return (
    <div className="searchBox position-relative iconWithText">
      <form
        onSubmit={(e) => {
          e.preventDefault(); 
          searchHandler();
        }}
      >
        <Button
          className="border-0 p-0 position-absolute icn"
          variant="transparent"
          type="submit"
          style={{ right: 10 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
          >
            <path
              d="M18.2462 17.225L13.1462 12.125C14.1212 10.925 14.7212 9.35 14.7212 7.625C14.7212 3.725 11.4962 0.5 7.59619 0.5C3.69619 0.5 0.471191 3.725 0.471191 7.625C0.471191 11.525 3.69619 14.75 7.59619 14.75C9.32119 14.75 10.8212 14.15 12.0962 13.175L17.1962 18.275C17.3462 18.425 17.5712 18.5 17.7212 18.5C17.8712 18.5 18.0962 18.425 18.2462 18.275C18.5462 17.975 18.5462 17.525 18.2462 17.225ZM7.59619 13.25C4.52119 13.25 1.97119 10.7 1.97119 7.625C1.97119 4.55 4.52119 2 7.59619 2C10.6712 2 13.2212 4.55 13.2212 7.625C13.2212 10.7 10.6712 13.25 7.59619 13.25Z"
              fill="#C4C4C4"
            />
          </svg>
        </Button>
        <input
          type="text"
          placeholder="Search"
          value={body.search}
          onChange={(e) =>
            setBody((p) => ({
              ...p,
              search: e.target.value,
            }))
          }
          className="form-control"
        />
      </form>
    </div>
  );
};

export default SearchFilter;
