import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

class VerifyEmail extends Component {

    constructor(props) {
        super(props);
            this.state = {
            loading: true,
            error: null,
            message: null,
        };
    }

    componentDidMount() {
        const searchParams = new URLSearchParams(this.props.location.search);
        const token = searchParams.get('token');

        axios.get(`https://api.oasisplatform.world/api/avatar/verify-email?token=${token}`)
        .then(response => {
            this.setState({loading: false})

            if(response.data.result?.isError) {
                toast.error(response?.data?.result.message);
                return;
            }
            
            const { history } = this.props;
            history.push('/');

            toast.success(response?.data?.result.message);
            this.setState({
                message: response.data.message,
            });
        })
        .catch(error => {
            this.setState({
                loading: false,
                error: error.response.data.message,
            });
        });
    }

  render() {
    const { loading, error, message } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        {message}
      </div>
    );
  }
}

export default VerifyEmail;