import React from "react";
import ReactDOM from 'react-dom';

type Props = {};
type State = {
    parent: {
        height: number,
        width: number
    }
};

export default class Loading extends React.Component<Props, State> {
    constructor(props = { width: 50, height: 50 }) {
        super(props);
        this.state = {
            parent: {
                height: 0,
                width: 0
            }
        }
    }
    componentDidMount(): void {
        const element = ReactDOM.findDOMNode(this)?.parentElement;
        const height = element?.offsetHeight!;
        const width = element?.offsetWidth!;
        this.setState({
            parent: {
                height: height,
                width: width
            }
        });
    }

    render() {
        const style = {
            margin: 'auto',
            display: 'block'
        };
        return (
            <div style={{ display: 'flex', background: '#0000004a', position: 'absolute', height: this.state.parent.height, width: this.state.parent.width }}>
                <svg style={style} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" fill="none" stroke="#ffffff" strokeWidth="10" r="35" strokeDasharray="164.93361431346415 56.97787143782138">
                        <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
                    </circle>
                </svg>
            </div>
        )
    }
}