import React, { Component } from 'react';
import individuals2 from './Individuals2'

class IndividualGrid2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            individuals2: []
        }

    }

    loadData = (individuals2) => {
        this.setState({individuals2: individuals2});
    }

     componentDidMount() {
        this.loadData(individuals2);
    }

    render() {
        console.log('inside render method individualgrid2')
        console.log(this.state.individuals2)
        
        const style = {
            paddingTop: '1px',
        }

        const individualList2 = this.state.individuals2.map(individual2 => {
            const idGrid = Math.floor(Math.random() * 1000000000000);

            return (
                <div key={idGrid}>
                    <p style={style}>FirstName: {individual2.first_name} - LastName: {individual2.last_name} - Email: {individual2.email}</p>
                </div>
                
            )
        })

        return (
            <div>
                <h1>Other list</h1>
                <div>
                    {individualList2}
                </div>
            </div>
        );
    }
}


export default IndividualGrid2;