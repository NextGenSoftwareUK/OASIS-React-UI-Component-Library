import React from 'react';

import { toast } from "react-toastify";

import { Modal } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { Formik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

import { Link, withRouter } from "react-router-dom";

class ResetPassword extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            show: false,
            form: {
                token: '',
                password: '',
                confirmPassword: ''
            },
            showPassword: false,
            loading: false
        }
    }

    validationSchema = Yup.object().shape({
        token: Yup.string()
            .required("Token is required"),
        password: Yup.string()
            .required("Password is required.")
            .min(8, "Password is too short - should be 8 characters minimum."),    
        confirmPassword: Yup.string()
            .required("Confirm Password is required.")
            .min(8, "Password is too short - should be 8 characters minimum.")    
    })

    componentDidMount() {
        this.setState({
            show: true
        })
    }

    hidePopup = () => {
        this.setState({
            show: false
        })
    }

    handleResetPassword = () => {
        if (this.state.form.password === this.state.form.confirmPassword) {
            let data = {
                token: this.state.form.token, // use token from form state
                NewPassword: this.state.form.password,
                ConfirmNewPassword: this.state.form.confirmPassword
            }
            this.setState({ loading: true })
    
            axios.post('https://api.oasisplatform.world/api/Avatar/reset-password', data)
                .then(response => {
                    this.setState({loading: false});

                    if(response.data.result?.isError) {
                        toast.error(response.data.result.message);
                        return;
                    }

                    this.props.history.push('/');
    
                    toast.success(response?.data?.result.message);
                })
                .catch(error => {
                    this.setState({
                        loading: false,
                    });
                });
        } else {
            toast.error("Password and Confirm password should be same.")
        }
    }
    
    
    render() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const token = searchParams.get('token');

        const initialValues = {
            token: token || '',
            password: '',
            confirmPassword: ''
        };

        return (
            <>
                <Formik
                    initialValues={initialValues}
                    validationSchema={this.validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            let form = values;
                            this.setState({form});
                            this.handleResetPassword();

                            setSubmitting(true);
                            // resetForm();
                            setSubmitting(false);
                        }, 400);
                    } }
                >
                    {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (

                        <Modal centered className="custom-modal" show={this.state.show} onHide={() => this.hidePopup()}>
                            <Modal.Body>
                                <span className="form-cross-icon" onClick={() => this.hidePopup()}>
                                    <i className="fa fa-times"></i>
                                </span>

                                <form className="custom-form" onSubmit={handleSubmit}>
                                    <div className="form-header">
                                        <h2>Reset Password</h2>
                                    </div>

                                    <div className="form-inputs">
                                        <div className={this.handleFormFieldClass(errors.password, touched.password)}>
                                            <label>Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={this.state.loading}
                                                placeholder="Password" />
                                            <span className="text-danger">{errors.password && touched.password && errors.password}</span>
                                        </div>

                                        <div className={this.handleFormFieldClass(errors.confirmPassword, touched.confirmPassword)}>
                                            <label>Confirm Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={this.state.loading}
                                                placeholder="Confirm Password" />
                                            <span className="text-danger">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>
                                        </div>

                                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                                            Reset {this.state.loading ? <Loader type="Oval" height={15} width={15} color="#fff" /> : null}
                                        </button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>
                    )}
                </Formik>
            </>
        )
    }

    handleFormFieldClass(error, touched) {
        let classes = "single-form-field ";
        classes += (error && touched) ? "has-error" : "";

        return classes;
    }
}

export default withRouter(ResetPassword);