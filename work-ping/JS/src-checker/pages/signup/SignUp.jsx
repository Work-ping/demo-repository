import { Card, CardBody, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LogoBox from '../../components/LogoBox';
import PageTitle from '../../components/PageTitle';
import ThirdPartyAuth from '../../components/ThirdPartyAuth';
import SignUpForm from './SignUpForm';
import signUpImg from '../../assets/images/sign-in.svg';

const SignUp = () => {
  return (
    <>
      <PageTitle title="Sign Up" />

      return (
  <div className="d-flex align-items-center justify-content-center min-vh-100">
    <div className="w-100">
   <Card className="auth-card">
        <CardBody className="p-0">
          <Row className="g-0 align-items-center">
            <Col lg={6} className="d-none d-lg-block border-end">
              <img src={signUpImg} className="img-fluid" alt="signup" />
            </Col>

            <Col lg={6}>
              <div className="p-4">
                <LogoBox containerClassName="text-center mb-4" />
                <h2 className="fw-bold text-center">Sign Up</h2>
                <p className="text-muted text-center mb-4">
                  Create your account in just a minute
                </p>

                <SignUpForm />
                <ThirdPartyAuth />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

    </div>
  </div>
);

      <p className="text-center mt-3">
        Already have an account?
        <Link to="/signin" className="fw-bold ms-1">
          Sign In
        </Link>
      </p>
    </>
  );
};

export default SignUp;
