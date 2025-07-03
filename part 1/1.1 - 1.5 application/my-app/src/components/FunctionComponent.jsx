import { useEffect, useState } from "react";

const FunctionComponent = ({ prop1, prop2 }) => {
  const [initial, setinitial] = useState(true);
  const handleClick = (event) => {
    console.log(event);
    setinitial((prev) => !prev);
  };

  useEffect(() => {
    console.log("This runs once");
  }, []);
  return (
    <div>
      <div>function component</div>
      <div>Initial: {initial.toString()}</div>
      <div>
        {prop1} {prop2}
      </div>
      <button onClick={handleClick}>click mee </button>
    </div>
  );
};

export default FunctionComponent;
