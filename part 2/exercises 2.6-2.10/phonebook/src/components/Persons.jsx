export default function Persons({ persons }) {
  return (
    <>
      {persons.map((pers) => (
        <p key={pers.name}>
          {pers.name.toLowerCase()} {pers.number}
        </p>
      ))}
    </>
  );
}
