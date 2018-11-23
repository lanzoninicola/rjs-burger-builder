import React, { Component} from 'react';

class CallbackTest extends Component {

    state = {
   
    }
    

    componentDidMount() {
        //la funzione di callback è this.callbackFunction()
        this.someFunction(this.callbackFunction());
       
        //in questo caso la funzione di callback è " () => ...somecode... " che chiama il metodo this.callbackFunction() -> e non funziona perchè 
        // si sta dichiarando una funzione a parametro (callback) e non la si sta eseguendo
        //this.someFunction(() => this.callbackFunction());
    }

    callbackFunction = () => {
        console.log('callbackFunction is Fired')
    }

    otherFunction = () => {
        return console.log('callbackFunction is Fired')
    }

    someFunction = () => {
        console.log('someFunction is Fired')
    }

    render() {

        return (
            <div>
                <p>Hello World</p>
                </div>
        );
    }
}

export default CallbackTest;