import Header from "./Header";
import Part from "./Part";

export default function Course({ course }) {
  // id, name, list of parts
  return (
    <div>
      <Header courseName={course.name}></Header>
      <ul>
        {course.parts.map((part) => {
          return (
            <Part
              key={part.id}
              name={part.name}
              exercises={part.exercises}
            ></Part>
          );
        })}
      </ul>
      <div>
        Total of {course.parts.reduce((acc, curr) => curr.exercises + acc, 0)}{" "}
        exercises
      </div>
    </div>
  );
}
