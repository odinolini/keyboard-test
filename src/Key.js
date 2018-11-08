import React, { Component } from "react";
import "./Key.css";

export default class Key extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let active = this.props.focus;
        let spacebar = this.props.spacebar ? " spacebar " : "";
        let spacebar_qwerty = this.props.spacebar_qwerty ? " spacebar-qwerty " : "";
        let children = this.props.children;

        if (children === "ø") {
            children = "⌫";
        }

        if (children === ".") {
            children = "⎵"
        }

        const chars = ",-æå";

        if (chars.indexOf(children) !== -1) {
            children = " ";
        }

        return (
            <div
            className={active ? "key key-active" + spacebar + spacebar_qwerty: "key" + spacebar + spacebar_qwerty}
            tabIndex="0"
            >
                {children}
            </div>
        );
    }
}
