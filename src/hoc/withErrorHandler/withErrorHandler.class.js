//https://www.udemy.com/react-the-complete-guide-incl-redux/learn/v4/questions/3112754
import React, { Component } from 'react';
import axios from 'axios';

import Auxx from '../Auxx/auxx';
import Modal from '../../components/UI/Modal/Modal'

const WithErrorHandler = (WrappedComponent, props) => {
   
    return class extends Component {
        state = {
            error: false,
            status: null,
            errorMessagge: null
        }

        reqInterceptor = null;
        resInterceptor = null;

    
        componentDidMount() {
            
            this.reqInterceptor = axios.interceptors.request.use(
                request => {
                    //console.log(request);
                    return request;
                },
                error => {
                    this.setState({
                        error: true,
                        status: error.response.status,
                        errorMessagge: error.response.statusText
                    })
                    return Promise.reject(error);
                }
            )
            
            this.resInterceptor = axios.interceptors.response.use(
                request => {
                    //console.log(request);
                    return request;
                },
                error => {
                    this.setState({
                        error: true,
                        status: error.response.status,
                        errorMessagge: error.response.statusText
                    })
                    return Promise.reject(error);
                }
            )

        }
        
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        
      
       render() {


      //      console.log('[inside wrapped_component] ' + WrappedComponent);
            console.log('[inside wrapped_component] ' + this.state.errorMessagge);
            
            let errorModal = null;

            if(this.state.error) {
                errorModal = (
                    <Modal> 
                        <h1>Error</h1>
                    </Modal>
                )
            }

            return (
                <Auxx> 
                    {errorModal}
                    <WrappedComponent {...props} />

                </Auxx> 
            )
        }
    }
}



export default WithErrorHandler;