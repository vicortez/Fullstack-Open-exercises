const Total = (props) => {
  return (
    <p>
      Number of exercises {props.counts[0] + props.counts[1] + props.counts[2]}
    </p>
  );
};

export default Total;
