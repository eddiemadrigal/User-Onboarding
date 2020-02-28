import React, { useState, useEffect } from "react";
import { withFormik, Form as FormX, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Form = ({ values, errors, touched, status }) => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    console.log("status has changed!", status);
    status && setUsers(users => [...users, status]);
  }, [status]);
  return (
    <div className="user-form">
      
      <FormX>
        
        <label htmlFor="name">
          Name
          
          <Field
            id="name"
            type="text"
            name="name"
            placeholder="Name"
          />
          
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
        </label>
        <label htmlFor="email">
          Email
          
          <Field
            id="email"
            type="email"
            name="email"
            placeholder="Email"
          />
          
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
        </label>

        <label htmlFor="password">
          Password
          <Field id="password" type="password" name="password" />
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
        </label>

        <label htmlFor="gender">
          Gender
        <Field as="select" className="gender" name="gender" id="gender">
          <option>Choose an Option</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </Field>
        </label>

        <label className="checkbox-container">
          Accept Terms of Service
          <Field
            type="checkbox"
            name="TOS"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>

        <Field as="textarea" type="text" name="notes" placeholder="Notes" />
        <button type="submit">Submit!</button>
      </FormX>
      <pre>{JSON.stringify(values, null, 2)}</pre>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      {users.map(user => {
        return (
          <ul key={user.id}>
            <li>Name: {user.name}</li>
            <li>Email: {user.email}</li>
            <li>Password: {user.password}</li>
          </ul>
        );
      })}
    </div>
  );
};

const FormikForm = withFormik({
    mapPropsToValues(props) {
    
    return {
      name: props.name || "",
      email: props.email || "",
      password: props.password || "",
      gender: props.gender || "",
      tos: props.tos || false,
      notes: props.notes || ""
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required('Your email is required'),
    password: Yup.string().required("Password is required")
  }),

  handleSubmit(values, { setStatus, resetForm }) {
    console.log("submitting", values);
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        console.log("success", res);
        setStatus(res.data);
        resetForm();
      })
      .catch(err => console.log(err.response));
  }
})(Form);
export default FormikForm;
