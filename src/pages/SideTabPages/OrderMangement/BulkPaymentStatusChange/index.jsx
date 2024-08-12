import React, { useState } from "react";
import { Button } from "react-bootstrap";
import PaymentStatusChangeModel from "../../../../components/Modals/PaymentStatusChangeModel";

const BulkPaymentStatusChange = ({ refetch }) => {
  const [model, setModel] = useState(false);

  return (
    <>
      <PaymentStatusChangeModel
        show={model}
        setModal={setModel}
        refetch={refetch}
      />
      <div>
        <h6 className="text-muted">Payment status </h6>
        <Button className="commonBtn" onClick={() => setModel(true)}>
          Import Excel
        </Button>
      </div>
    </>
  );
};

export default BulkPaymentStatusChange;
