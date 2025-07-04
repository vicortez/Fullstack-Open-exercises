import React from "react";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { val: true };
  }

  componentDidMount() {
    console.log("mounted");
  }

  handleClick() {
    this.setState(
      (prevState) => ({ val: !prevState.val }),
      () => {
        console.log("new state: " + this.state.val);
      }
    );
  }

  render() {
    return (
      <div>
        <div>some tests, not related to the exercise</div>
        <div>hi: {this.props.a}</div>
        <div>state: {String(this.state.val)}</div>
        <button onDoubleClick={() => this.handleClick()}> CLICK</button>
      </div>
    );
  }
}

export default ClassComponent;
