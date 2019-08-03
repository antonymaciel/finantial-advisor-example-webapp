import React from "react"
import { Link } from "react-router-dom"
import { Button, Colors } from 'react-foundation';

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
                 <Button onClick={() => alert('click')} color={Colors.SUCCESS}>Submit</Button>
            </div>
        );
    }
}
export default Home;