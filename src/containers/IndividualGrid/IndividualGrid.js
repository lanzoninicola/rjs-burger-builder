
/*

    USO PER FARE TEST DI RE-RENDER CON CHILD COMPONENT  - DA COMPLETARE ANALISI

*/



import React, { Component } from 'react';
import individuals from './Individuals'
import IndividualGrid2 from './IndividualGrid2/IndividualGrid2';


class IndividualGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            individuals: [],
        }

    }

    loadData = (individuals) => {
        this.setState({individuals: individuals});
    }

     componentDidMount() {
        this.loadData(individuals);
    }

    render() {
        console.log('inside render method individualgrid')
        console.log(this.state.individuals)
        
        const style = {
            paddingTop: '1px',
        }

        const individualList = this.state.individuals.map(individual => {
            const idGrid = Math.floor(Math.random() * 1000000000000);

            return (
                <div key={idGrid}>
                    <p style={style}>FirstName: {individual.first_name} - LastName: {individual.last_name} - Email: {individual.email}</p>
                </div>
                
            )
        })

        return (
            <div>
                <div>
                    {individualList}
                </div>
                <IndividualGrid2 />
            </div>
        );
    }
}


export default IndividualGrid;