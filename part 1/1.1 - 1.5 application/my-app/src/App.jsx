import ClassComponent from "./components/ClassComponent";
import Content from "./components/Content";
import FunctionComponent from "./components/FunctionComponent";
import Header from "./components/Header";
import Total from "./components/Total";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header courseName={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
      <hr></hr>
      <br></br>
      <ClassComponent a={"a"}></ClassComponent>
      <br></br>
      <FunctionComponent></FunctionComponent>
    </div>
  );
};

export default App;
