//https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/questions/3112754
import React, { Component } from 'react';
import axios from 'axios';


class WithErrorHandler extends Component {
    state = {
        status: null,
        errorMessagge: null
    }


    componentDidUpdate() {
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
  
    }
  
   render() {

        let componentBody = '';
        const errorMessagge = <p style={{textAlign: 'center'}}>{this.state.errorMessagge}</p>;


        if(this.state.status === 404 ){
            componentBody = errorMessagge;
        } else {
            componentBody = <div>{this.props.children}</div>;
        }
        
        return componentBody;
    }
}

export default WithErrorHandler;