import React from "react";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { initial: true };
  }

  componentDidMount() {
    console.log("mounted");
  }

  handleClick() {
    this.setState(
      (prevState) => ({ initial: !prevState.initial }),
      () => {
        console.log("new state: " + this.state.initial);
      }
    );
  }

  render() {
    return (
      <div>
        <div>hi: {this.props.a}</div>
        <button onDoubleClick={() => this.handleClick()}> CLICK</button>
      </div>
    );
  }
}

export default ClassComponent;
