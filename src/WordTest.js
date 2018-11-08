import React, { Component } from 'react';

export default class WordTest extends Component {
    constructor(props) {
        super(props);
        this.state = {inputValue: ""}
    }

    onInputValueChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    componentWillReceiveProps() {
    }
    
    componentWillUpdate() {
    }

    render () {
        return (
            <div className="wordtest">
                <input type="text" onChange={this.props.onChange} placeholder="Hvilket ord skal testes?" value={this.state.value} />

            </div>
        );
    }
}