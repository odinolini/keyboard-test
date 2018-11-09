import React, { Component } from "react";
import "./App.css";
import Kb from "./Kb";
import Keeb from "./Keeb";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import WordTest from './WordTest';

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {word: "", writtenKeys: ""}
    }

    wordChange = (e) => {
      this.setState({word: e.target.value});
    }

    keyChange = (val) => {
      this.setState({writtenKeys: val});
    }

    render() {
        return (
          
            <div className="App">
  
            <WordTest
            onChange={this.wordChange}
            value={this.state.word}
            testWord={this.state.writtenKeys}
            />
                <BrowserRouter>
                    <div>
                        <nav>
                          <ul>
                            <li><Link to="/abc">Alfabetisk</Link></li>
                            <li><Link to="/qwerty">Qwerty</Link></li>
                          </ul> 
                        </nav>

                        <Switch>
                            <Route
                                path="/abc"
                                render={props => (
                                    <Kb
                                        {...props}
                                        keys={",.-æøåABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".toLowerCase()}
                                        keyboardWidth={6}
                                        word={this.state.word}
                                        onChange={this.keyChange}
                                        testWord={this.state.word}
                                    />
                                )}
                            />

                            <Route
                                path="/qwerty"
                                render={props => (
                                    <Keeb
                                        {...props}
                                        testWord={this.state.word}
                                        keys={[
                                            "1234567890",
                                            "qwertyuiop",
                                            "asdfghjkl-",
                                            "zxcvbnm⌫⌫-",
                                            "          "
                                        ]}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
