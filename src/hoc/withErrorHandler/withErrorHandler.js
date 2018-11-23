import React from 'react';
import axios from 'axios';

const withErrorHandler = (props) => {

    

    axios.interceptors.request.use(
        request => {
            //console.log(request);
            return request;
        },
        error => {
            this.setState({
                status: error.response.status,
                errorMessagge: error.response.statusText
            })
            return Promise.reject(error);
        }
    )
    
    axios.interceptors.response.use(
        request => {
            //console.log(request);
            return request;
        },
        error => {
            this.setState({
                status: error.response.status,
                errorMessagge: error.response.statusText
            })
            return Promise.reject(error);
        }
    )

    let componentBody = '';
    const errorMessagge = <p style={{textAlign: 'center'}}>{this.state.errorMessagge}</p>;


    if(this.state.status === 404 ){
        componentBody = errorMessagge;
    } else {
        componentBody = <div>{this.props.children}</div>;
    }

    return componentBody;
};

export default withErrorHandler;