import React from "react";
// css
import styles from "./Table.module.scss";
import Loading from "../Common/Loading";

// image

const showUnderScoreIds =
  import.meta.env.VITE_APP_SHOW_UNDER_SCORE_ID_IN_TABLES === "true";

const TableLayout = ({ column, data, loader }) => {
  const isUnderScoreColAlreadyAdded = column?.some((item) => {
    if (item.accessor === "_id") {
      return true;
    }
  }); // this is to avoid duplicated _id id on development mode , if_id is already showing in the table


  console.log(column , "Column" , data)

  return (
    <>
      <div className="table-responsive">
        <table className={`${styles.table} table`}>
          <thead>
            <tr className="border">
              {!isUnderScoreColAlreadyAdded && showUnderScoreIds && (
                <th className="text-muted fw-bold">_id</th>
              )}
              {column &&
                column?.length > 0 &&
                column?.map((item, key) => {
                  if (item?.headComponent) {
                    return (
                      <>
                        <th className="text-muted fw-bold">
                          {item?.headComponent(data, key, data)}
                        </th>
                      </>
                    );
                  }
                  return (
                    <>
                      <th className="text-muted fw-bold">{item.head}</th>
                    </>
                  );
                })}
            </tr>
          </thead>
          <tbody>
            {!loader &&
              data &&
              data?.length > 0 &&
              data.map((data, columnkey) => {
                return (
                  <tr>
                    {!isUnderScoreColAlreadyAdded && showUnderScoreIds && (
                      <td className="border-bottom border-secondary">
                        {" "}
                        {data?._id}
                      </td>
                    )}
                    {column &&
                      column?.length > 0 &&
                      column?.map((item, key) => {
                        if (item.component) {
                          return (
                            <td className="border-bottom border-secondary">
                              {item.component(data, columnkey, data)}
                            </td>
                          );
                        }

                        return (
                          <td className="border-bottom border-secondary">
                            {data[item?.accessor]}
                          </td>
                        );
                      })}
                  </tr>
                );
              })}
            {!!loader && (
              <tr>
                <td colSpan={column?.length} align="center">
                  <Loading />
                </td>
              </tr>
            )}
            {!loader && !!!data?.length && (
              <tr>
                <td colSpan={column?.length}>
                  <p className="text-center">No Data Found!</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableLayout;
