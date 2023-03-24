import React from "react";

import ShowIcon from "../assets/images/visible-icon.svg";
import HideIcon from "../assets/images/hidden-icon.svg";

import ForgetPassword from "./ForgetPassword";

import { Modal } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from 'react-toastify';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            form: {
                username: '',
                password: '',
            },
            showPassword: false,
            showForgetPasswordPopup: false,
            loading: false
        }
    }

    initialValues = {
        username: '',
        password: ''
    }
    validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("Username is required"),
        password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 characters minimum.")
    })

    handleLogin = () => {
        this.setState({ loading: true })
        
        let data = {
            "providerType": "provider",
            "setGlobally": true,
            "autoFailOverMode": "default",
            "autoReplicationMode": "default",
            "autoLoadBalanceMode": "default",
            "autoFailOverProviders": "default",
            "autoReplicationProviders": "default",
            "autoLoadBalanceProviders": "default",
            "waitForAutoReplicationResult": true,
            "showDetailedSettings": true,
            ...this.state.form
        }

        axios({
            method: 'post',
            url: 'https://api.oasisplatform.world/api/avatar/authenticate/',
            data: data, // you are sending body instead
            headers: {
                'Content-Type': 'application/json'
            }, 
        })
        .then((response) => {
            console.log(response)
            this.setState({loading: false})
            if (response.data.result?.isError) { 
                toast.error(response.data.result.message);
                return; 
            }

            const data = response.data.result.result;
            localStorage.clear();

            toast.success(response.data.result.message);
            this.setState({user: response.data.result})

            this.props.setUserStateData(data);
            this.props.hide();
        })
        .catch((err) => {
            console.log(err)
            toast.error('err');
            this.setState({loading: false})
            return { error: true, data: err };
        });
    }

    showForgetPasswordPopup = (hideLogin) => {
        this.setState({
            showForgetPasswordPopup: true
        });
        hideLogin();
    };

    hideForgetPasswordPopup = () => {
        this.setState({
            showForgetPasswordPopup: false
        });
    };

    render() {
        const { showPassword, loading } = this.state;
        const { show, hide, change } = this.props;

        return (
            <>

                <Formik
                    initialValues={this.initialValues}
                    validationSchema={this.validationSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            console.log(values);
                            let form = values;
                            this.setState({form});
                            this.handleLogin();

                            setSubmitting(true);
                            // resetForm();
                            setSubmitting(false);
                        }, 400);
                    } }
                >
                    {({ values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit }) => (

                        <Modal centered className="custom-modal" show={show} onHide={hide}>
                            <Modal.Body>
                                <span className="form-cross-icon" onClick={hide}>
                                    <i className="fa fa-times"></i>
                                </span>

                                <form className="custom-form" onSubmit={handleSubmit}>
                                    <div className="form-header">
                                        <h2>Log In</h2>

                                        <p>
                                            Don't have an account? 
                                            <span className="text-link" onClick={change}> Sign Up!</span>
                                        </p>
                                    </div>

                                    <div className="form-inputs">
                                        <div className={this.handleFormFieldClass(errors.username, touched.username)}>
                                            <label>USERNAME</label>
                                            <input
                                                type="email"
                                                name="username"
                                                value={values.username}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                disabled={loading}
                                                placeholder="name@example.com" />
                                            <span className="text-danger">{errors.username && touched.username && errors.username}</span>
                                        </div>

                                        <div className={this.handleFormFieldClass(errors.password, touched.password)}>
                                            <label>PASSWORD</label>
                                            <div className="have-icon">
                                                <input
                                                    type={`${showPassword ? "text" : "password"}`}
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    disabled={loading}
                                                    placeholder="password" />
                                                <img
                                                    className="field-icon"
                                                    onClick={() => this.setState({ showPassword: !showPassword })}
                                                    src={showPassword ? ShowIcon : HideIcon}
                                                    alt="icon" />
                                            </div>
                                            <span className="text-danger">{errors.password && touched.password && errors.password}</span>
                                        </div>

                                        <div className="forgot-password">
                                            <label className="text-link" onClick={() => this.showForgetPasswordPopup(hide)}>Forgot Password?</label>
                                        </div>

                                        <div className="remember-me">
                                            <label>
                                                <input type="checkbox" name="remember-login" id="remember-login" />
                                                Remember me
                                            </label>
                                        </div>

                                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                                            {loading ? 'Logging in ' : 'Submit '} {loading ? <Loader type="Oval" height={15} width={15} color="#fff" /> : null}
                                        </button>
                                    </div>
                                </form>
                            </Modal.Body>
                        </Modal>
                    )}
                </Formik>

                <ForgetPassword
                    className="custom-form"
                    show={this.state.showForgetPasswordPopup}
                    hide={this.hideForgetPasswordPopup}
                    change={this.showForgetPasswordPopup}
                />
            </>
        )
    }

    handleFormFieldClass(error, touched) {
        let classes = "single-form-field ";
        classes += (error && touched) ? "has-error" : "";

        return classes;
    }
}
