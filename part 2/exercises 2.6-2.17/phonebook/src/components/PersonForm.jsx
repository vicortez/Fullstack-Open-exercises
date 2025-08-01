export default function PersonForm({
  onSubmit,
  newName,
  onChangeName,
  newNumber,
  onChangeNumber,
}) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input value={newName} onChange={onChangeName} />
      </div>
      <div>
        number: <input type="tel" value={newNumber} onChange={onChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}
