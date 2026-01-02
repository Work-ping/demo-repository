import { useState } from "react";
import EmployeeDetailsForm from "./EmployeeDetailsForm";
import FaceEmbeddings from "./FaceEmbeddings";
import VerifiedIds from "./verifiedIds";
import { Button } from "react-bootstrap";

const AddEmployee = () => {
  const steps = [
    <EmployeeDetailsForm />,
    <FaceEmbeddings />,
    <VerifiedIds />
  ];

  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const submitForm = () => {
    console.log("Submit clicked");
  };

  return (
    <>
      {steps[step]}
      <div className="d-flex justify-content-between mt-3">
        {step > 0 ? (
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={prevStep}
          >
            Previous
          </Button>
        ) : (
          <div />
        )}
        {step < steps.length - 1 ? (
          <Button
            variant="primary"
            className="rounded-pill"
            onClick={nextStep}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="success"
            className="rounded-pill"
            onClick={submitForm}
          >
            Submit
          </Button>
        )}
      </div>
    </>
  );
};

export default AddEmployee;
