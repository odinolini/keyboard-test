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

export default class Kb extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: [],
            keyboardWidth: this.props.keyboardWidth,
            pointerPosition: 0,
            x: 0,
            y: 0,
            keyArr: this.props.keys.split(""),
            textFieldValue: "",
            preventNextEnter: false,
            firstPress: true
        };
    }

    componentDidMount() {
        this.createAlphabeticalKeyboard();

        document.addEventListener("keydown", e => this.onKeyDown(e));
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", e => this.onKeyDown(e));
    }

    backSpace = (x, y) => {
        let textFieldValue = this.state.textFieldValue;
        this.setState({
            x: x,
            y: y,
            currentKey: "BACKSLASH",
            textFieldValue: textFieldValue
        });
        this.createAlphabeticalKeyboard([x, y]);
    };

    addSpace = (x, y) => {
        this.setState({ x: x, y: y, currentKey: " " });
        this.createAlphabeticalKeyboard([x, y]);
    };

    onKeyDown = e => {
        let keys = this.state.keys;

        let x = this.state.x;
        let y = this.state.y;

        switch (e.keyCode) {
            case 40: //Down
                if (x < keys.length - 1) {
                    x++;
                }
                if (this.state.firstPress) {
                    this.setState({firstPress: false});
                    this.test("start");
                }
                break;
            case 39: //Right
                if (y < keys[x].length - 1) {
                    y++;
                }
                if (x === 0 && (y >= 3 && y < 6)) {
                    this.backSpace(x, y);
                    return;
                } else if (x === 0 && (y >= 0 && y < 3)) {
                    this.addSpace(x, y);
                    return;
                }
                break;
            case 38: //Up
            
            //For the space function
            if ((x === 1 || x === 0) && y >= 0 && y < 3) {
                if (x > 0) {
                    x--;
                }
                this.addSpace(x, y);
                return;
            }
            //Backspace function
            if ((x === 1 || x === 0) && y >= 3 && y < 6) {
                if (x > 0) {
                    x--;
                }
                this.backSpace(x, y);
                return;
            }
            
            if (x > 0) {
                x--;
            }
                break;
            case 37: //Left
                if (y > 0) {
                    y--;
                }
                if  (x === 0 && (y >= 0 && y < 3)) {
                    this.addSpace(x, y);
                    return;
                } else if (x === 0 && y >= 3 && y < 6) {
                    this.backSpace(x, y);
                    return;
                }
                break;
            case 13: //Enter
                this.handleEnter(e);
                if (x === 0) {
                    return;
                }
                break;
        }

        let currentKey = keys[x][y].key;

        this.setState({ x: x, y: y, currentKey: currentKey });

        this.createAlphabeticalKeyboard([x, y]);
    };

    handleEnter = e => {
        let currentKey = this.state.currentKey;

        let textFieldValue = this.state.textFieldValue;

        if (currentKey === "BACKSLASH") {
            let max = textFieldValue.length - 1;
            textFieldValue = textFieldValue.substring(0, max);
            this.setState({ textFieldValue: textFieldValue });
            this.props.onChange( textFieldValue );
            return;
        }
        let newTfv = textFieldValue + currentKey;
        
        this.setState({ textFieldValue: newTfv });
        this.props.onChange( newTfv );

    /*         if (newTfv.length === 1) {
                this.test("start");
            } */

        if (newTfv === this.props.testWord) {
            this.test("stop");
        }
    };

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

    createAlphabeticalKeyboard(xyArr = []) {
        let keyArr = this.state.keyArr;
        let keyboardWidth = this.state.keyboardWidth;
        let keys = [];

        let keyMultiArr = [];
        let currentKey = this.state.currentKey;

        for (let i = 0; i < keyArr.length; i += keyboardWidth) {
            keyMultiArr.push(keyArr.slice(i, i + keyboardWidth));
        }

        for (let x = 0; x < keyMultiArr.length; x++) {
            let temparr = [];
            for (let y = 0; y < keyMultiArr[x].length; y++) {
                let shouldBeFocused = false;
                if (x === xyArr[0] && y === xyArr[1]) {
                    shouldBeFocused = true;
                }
                let chars = ',.-æøå'
                if (chars.indexOf(keyMultiArr[x][y]) !== -1) {
                    temparr.push(
                        <Key
                            key={keyMultiArr[x][y]}
                            spacebar
                            focus={shouldBeFocused}
                        >
                            {keyMultiArr[x][y]}
                        </Key>
                    );
                } else {
                    temparr.push(
                        <Key key={keyMultiArr[x][y]} focus={shouldBeFocused}>
                            {keyMultiArr[x][y]}
                        </Key>
                    );
                }
            }
            keys.push(temparr);
        }

        this.setState({ keys: keys });
    }

    render() {
        return (
            <div className="key-container">
                <input
                    className="textfield"
                    value={this.state.textFieldValue}
                />
                {this.state.keys.map((row, index) => {
                    return (
                        <React.Fragment key={index}>
                            {row}
                            <br />
                        </React.Fragment>
                    );
                })}
                {this.state.end ? <h2>Tid: {(this.state.end-this.state.start) / 1000 } s</h2> : null}
            </div>
        );
    }
}
