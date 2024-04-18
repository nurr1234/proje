import React, { useState } from "react";
import { Button, Card, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setListRefreshToken, setOperation } from "../../store/slices/misc-slice";
import { swalAlert } from "../../helpers/functions/swal";
import ButtonLoader from "../../components/common/button-loader";
import { Link } from "react-router-dom";

const createPublisher = async (publisherData) => {
  console.log("Creating new publisher:", publisherData);
};

const PublisherNewPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    description: "",
    website: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    website: Yup.string().url("Website must be a valid URL").required("Website URL is required")
  });

  const onSubmit = async (values, formikBag) => {
    setLoading(true);
    try {
      await createPublisher(values);
      formikBag.resetForm();
      dispatch(setListRefreshToken(Math.random()));
      dispatch(setOperation(null));
      swalAlert("Publisher created successfully", "success");
    } catch (err) {
      console.log(err);
      swalAlert("Failed to create publisher", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    dispatch(setOperation(null));
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to="/new-publisher" className="text-decoration-none">New Publisher</Link>
          </Card.Title>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="row-cols-1 row-cols-sm-2">
              <Col>
                <FloatingLabel controlId="name" label="Name">
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    {...formik.getFieldProps("name")}
                    isInvalid={formik.touched.name && !!formik.errors.name}
                    className="custom-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="description" label="Description">
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    {...formik.getFieldProps("description")}
                    isInvalid={formik.touched.description && !!formik.errors.description}
                    className="custom-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.description}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel controlId="website" label="Website">
                  <Form.Control
                    type="text"
                    placeholder="Enter website URL"
                    {...formik.getFieldProps("website")}
                    isInvalid={formik.touched.website && !!formik.errors.website}
                    className="custom-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.website}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col className="text-end">
                <Button variant="warning" type="button" onClick={handleCancel} className="me-3">
                  Cancel
                </Button>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={!(formik.dirty && formik.isValid) || loading}
                >
                  {loading ? <ButtonLoader /> : "Create"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PublisherNewPage;
