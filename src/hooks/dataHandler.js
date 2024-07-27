/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import {
  catchAsync,
  changePageToOne,
  checkResponse,
} from "../utilities/utilities";
import { defaultDeleteModelState } from "../utilities/const";
import { toast } from "react-toastify";

const dataHandler = ({ api, extraBody }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState();
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);
  const [deleteModel, setDeleteModel] = useState(defaultDeleteModelState);
  const [body, setBody] = useState({
    search: "",
    status: "",
    page: 1,
    offset: 0,
    limit: 10,
    orderBy: "createdAt",
    sortOrder: -1,
    paymentStatus: "",
    isSlotCompleted: "",
    ...extraBody,
  });

  const getData = catchAsync(async (body) => {
    setLoader(true);
    const res = await api(body);
    checkResponse({
      res,
      setData,
      setLoader,
      setTotal,
    });
  }, setLoader);

  const refetch = () => {
    const newBody = changePageToOne(body, setBody);
    getData(newBody);
  };

  let oldData;
  const statusChangeCallBack = () => {
    setData((p) => oldData);
  };
  const statusChangeHandler = catchAsync(
    async (api, key) => {
      oldData = JSON.parse(JSON.stringify(data));

      setData((p) => {
        const newArr = JSON.parse(JSON.stringify(p));
        newArr[key].status =
          newArr[key].status === "active" ? "inactive" : "active";
        return newArr;
      });

      const res = await api();
      checkResponse({ res, showSuccess: true });
    },
    null,
    statusChangeCallBack
  );

  const deleteHandler = catchAsync(async (api) => {
    const res = await api();
    checkResponse({ res, showSuccess: true });
    setDeleteModel({ show: false, dumpId: "" });
    refetch();
  });

  const paginationHandler = catchAsync(async (page) => {
    const newBody = {
      ...body,
      page,
      offset: page * body.limit - body.limit,
    };
    setBody((p) => newBody);
    getData(newBody);
  });

  const searchHandler = () => {
    const newBody = { ...body, page: 1, search: body.search.trim() };
    setBody((p) => newBody);
    getData(newBody);
  };

  useEffect(() => {
    if (body?.search?.trim() === "") {
      setIsMounted((p) => true);
      refetch();
    }
  }, [body.search]);

  useEffect(() => {
    if (!isMounted) return;
    refetch();
  }, [body.status, body.limit, body.paymentStatus, body.isSlotCompleted]);

  return {
    data,
    setData,
    body,
    setBody,
    loader,
    setLoader,
    total,
    deleteModel,
    setDeleteModel,
    paginationHandler,
    searchHandler,
    refetch,
    getData,
    statusChangeHandler,
    deleteHandler,
  };
};

export default dataHandler;
