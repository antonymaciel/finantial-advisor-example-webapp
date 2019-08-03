import React from "react"
import { Link } from "react-router-dom"

class Home extends React.Component {
    constructor(props){
		super(props);
		this.state= {
			test:'hello'
		}
    }

    render() {
        return (
            <div>
                 <Link to="/recomend">Go to Recomend</Link>
                <button onClick={() => alert('click')}>Click Me!</button>
            </div>
        );
    }
}
export default Home;