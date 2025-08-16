export default function Persons({ persons, onDelete }) {
  return (
    <>
      {persons.map((pers) => (
        <p key={pers.name}>
          {pers.name.toLowerCase()} {pers.number}{" "}
          <button onClick={() => onDelete(pers.id)}>delete</button>
        </p>
      ))}
    </>
  )
}
