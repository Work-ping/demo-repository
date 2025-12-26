import { Button } from "react-bootstrap";

const ThirdPartyAuth = () => {
  return (
    <>
      <p className="text-center mt-4 fw-semibold">OR sign up with</p>

      <div className="d-flex justify-content-center gap-2">
        <Button variant="light" type="button">
          <i className="bi bi-google" />
        </Button>
        <Button variant="light" type="button">
          <i className="bi bi-facebook" />
        </Button>
        <Button variant="light" type="button">
          <i className="bi bi-github" />
        </Button>
      </div>
    </>
  );
};

export default ThirdPartyAuth;
