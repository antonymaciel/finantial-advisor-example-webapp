import React from "react"
import { Button } from 'react-foundation';
import { Doughnut } from 'react-chartjs-2';
import Header from "../components/header"
import "../styles/screens/recomend.scss";
import "../styles/index.scss";

class Recomend extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            fields: new Array(props.categories.length).fill(0),
            recomendations: [],
            errors: new Array(props.categories.length).fill(false),
            showError: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event, field) {
        const errorInput = parseInt(event.target.value, 10) <= 0;
        let { fields, errors } = this.state;
        fields[field] = event.target.value;
        errors[field] = errorInput;
        const and = (a, b) => a + b;
        const showError = errors.reduce(and) === 1;
        this.setState({fields: [...fields], errors, showError});
    }

    handleSubmit(event) {
        if (!this.state.showError) {
            const recomendations = this.props.calculteRecomendations(this.state.fields);
            this.setState({recomendations}); 
        }
        event.preventDefault();
    }


    renderRecomendation = (result) => {
        let className = "has-text-success";
        let recomendation = "Mantain equal this investment";
        if (result > 0) {
            recomendation= "Increase $" + result + " this investment";
            className = "has-text-danger"; 
        } else if (result < 0) {
            recomendation= "Decrease $" + result * (-1) + " this investment";
            className = "has-text-danger"; 
        }
        return (<h1 className={"recomendation-text " + className}>{recomendation}</h1>);
    }

    renderInputs = () => {
        const { categories } = this.props;
        const { recomendations } = this.state;
        const inputs = [];
        for (let i= 0; i < categories.length ; i++) {
            inputs.push(
                <div key={i} className="input-container">
                    <label className="label-categories-text" >
                        {categories[i]}
                    </label>
                    <input 
                        className="input-category"
                        type="number"
                        value={this.state.fields[i]}
                        onChange={(event) => this.handleChange(event, i)}
                        placeholder={0} />
                    { recomendations.length > 0 && this.renderRecomendation(recomendations[i]) }
                </div>
            )
        };
        return inputs;
    }

    render() {
        return (
            <div className="containerpage flex">
                <Header />
                <div className="section flex">
                    <div>
                        <Doughnut
                            options={{maintainAspectRatio: false}}
                            width={700}
                            height={350}
                            data={{
                                labels: this.props.categories,
                                datasets: [{
                                    label: "Categories",
                                    backgroundColor: [   'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)'],
                                    borderColor: 'rgb(255, 99, 132)',
                                    data: this.props.chartData,
                                }]
                            }} 
                            
                        />
                    </div>
                    <div>
                        <form onSubmit={(event) => this.handleSubmit(event)}>
                            <h2 className="subtitle">Please input your actual investment($)</h2>
                            <div className="inputs-container">
                                {this.renderInputs()}
                            </div>
                            {this.state.showError && <h2 className="has-text-danger">Error: input positive values</h2>}
                            <div className="flex button-recomend-container">
                                <Button type="submit" value="Submit" className="button button-recomend">Calculate</Button>
                            </div>
                        </form>
                    </div>
                    <div>
                        
                    </div>
                </div>
                 
            </div>
        );
    }
}
export default Recomend;