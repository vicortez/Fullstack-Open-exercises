import Part from "./Part";

const Content = (props) => {
  return (
    <>
      <Part
        name={props.exerciseCounts[0].name}
        exerciseCount={props.exerciseCounts[0].exerciseCount}
      ></Part>
      <Part
        name={props.exerciseCounts[1].name}
        exerciseCount={props.exerciseCounts[1].exerciseCount}
      ></Part>
      <Part
        name={props.exerciseCounts[2].name}
        exerciseCount={props.exerciseCounts[2].exerciseCount}
      ></Part>
    </>
  );
};

export default Content;
