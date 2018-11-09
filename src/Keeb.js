import React, { Component } from "react";
import Key from "./Key";
import "./Key.css";

/*
 * Display KB alphabetical
 * Display KB qwerty
 * Navigate with arrows
 * Choose test-word
 * Write test-word
 * Record and display time spent
 * 
 */

export default class Keeb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyArr: [],
            keyboardWidth: this.props.keyboardWidth,
            pointerPosition: 0,
            x: 0,
            y: 0,
            textFieldValue: "",
            keyComponentArr: [],
            firstPress: true
        };
    }

    componentDidMount() {
        this.createKeyboard();

        document.addEventListener("keydown", e => this.onKeyDown(e));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", e => this.onKeyDown(e));
    }

    onKeyDown = e => {
        let keys = this.props.keys;


        let x = this.state.x;
        let y = this.state.y;
        
        switch (e.keyCode) {
            case 40: //Down
                if (x < keys.length - 1) {
                    //Acounting for rows of different length
                    if ((x === 2 && y !== 0 && y !== 8 ) || (x === 1 && y === 9) ) {
                        //y--;
                    } else if (x === 2 && y === 8) {
                        //y--;
                    } if (this.state.firstPress) {
                        this.setState({firstPress: false});
                        this.test("start");
                    }
                    x++;
                }
                break;
                case 39: //Right
                if (y < keys[x].length - 1) {
                    y++;
                }
                break;
                case 38: //Up
                if (x > 0) {
                    if (x === 3) {
                        //y++;
                    }
                    x--;
                }
                break;
                case 37: //Left
                if (y > 0) {
                    y--;
                }
                break;
                case 13: //Enter
                this.handleEnter(e);
                break;
            }
            
            let currentKey = keys[x][y];
            this.setState({ x: x, y: y, currentKey: currentKey });
            
            this.createKeyboard([x, y]);
        };

    handleEnter = e => {
        let textFieldValue = this.state.textFieldValue;
        let currentKey = this.state.currentKey;
        if (currentKey === "⌫") {
            this.setState({ textFieldValue: textFieldValue.substring(0, textFieldValue.length-1) });
            return;
        }

        let newTfv = textFieldValue + currentKey;
        this.setState({ textFieldValue: newTfv });

/*         if (newTfv.length === 1) {
            this.test("start");
        } */

        if (newTfv === this.props.testWord) {
            this.test("stop");
        }
    };
    

    createKeyboard(xyArr = []) {
        let keyArr = [];

        let keys = this.props.keys;
        let currentKey = this.state.currentKey;

        for (let i = 0; i < keys.length; i++) {
            keyArr.push(keys[i].split(""));
        }

        let keyComponentArr = [];
        for (let x = 0; x < keyArr.length; x++) {
            let temparr = [];
            for (let y = 0; y < keyArr[x].length; y++) {
                let shouldBeFocused = false;
                if (x === xyArr[0] && y === xyArr[1]) {
                    shouldBeFocused = true;
                }

                if (keyArr[x][y] === " ") {
                    temparr.push(<Key spacebar_qwerty focus={shouldBeFocused}>{keyArr[x][y]}</Key>)
                } else {
                    temparr.push(<Key focus={shouldBeFocused}>{keyArr[x][y]}</Key>)
                }
            }
            keyComponentArr.push(temparr);
        }

        this.setState({keyArr: keyArr, keyComponentArr: keyComponentArr})

    }

    test(arg) {
        let timer = this.state.time;

        let start;

        if (arg === "start") {
            start = Date.now();
            console.log("test start");
            this.setState({start: start})
        }

        if (arg === "stop") {
            let end = Date.now();
            this.setState({end: end})
            console.log("Time: ", end-this.state.start, "ms, ", (end-this.state.start)/1000, "s");
        }

    }

    render() {
        return (
            <div className="key-container">
                <input
                    className="textfield"
                    value={this.state.textFieldValue}
                />
                {this.state.keyComponentArr.map((row) => {
                    return <>{row}<br /></>
                })}
                {this.state.end ? <h2>Tid: {(this.state.end-this.state.start) / 1000 } s</h2> : null}

            </div>
        );
    }
}
