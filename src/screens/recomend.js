import React from "react"
import { Button } from 'react-foundation';
import { Doughnut } from 'react-chartjs-2';
import Header from "../components/header"
import "../styles/screens/recomend.scss";
import "../styles/index.scss";

class Recomend extends React.Component {

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
        const { categories, handleChange, recomendations, fields } = this.props;
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
                        value={fields[i]}
                        onChange={(event) => handleChange(event, i)}
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
                        <form onSubmit={(event) => this.props.handleSubmit(event)}>
                            <h2 className="subtitle">Please input your actual investment($)</h2>
                            <div className="inputs-container">
                                {this.renderInputs()}
                            </div>
                            {this.props.showError && <h2 className="has-text-danger error-msg">Error: input positive values</h2>}
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