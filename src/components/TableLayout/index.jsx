import React from "react";
import { Button } from "react-bootstrap";

// css
import styles from "./Table.module.scss";
import Loading from "../Common/Loading";

// image

const TableLayout = ({ column, data, loader }) => {
  return (
    <>
      <div className="table-responsive">
        <table className={`${styles.table} table`}>
          <thead>
            <tr className="border">
              {column &&
                column.length > 0 &&
                column.map((item, key) => (
                  <>
                    <th className="text-muted fw-bold">{item.head}</th>
                  </>
                ))}
            </tr>
          </thead>
          <tbody>
            {!loader && data &&
              data?.length > 0 &&
              data.map((data, columnkey) => {
                return (
                  <tr>
                    {column &&
                      column.length > 0 &&
                      column.map((item, key) => {
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
                <td colSpan={column.length} align="center">
                  <Loading />
                </td>
              </tr>
            )}
            {!loader && !!!data?.length && (
              <tr>
                <td colSpan={column.length}>
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
