export default function Filter({ filterText, onChange }) {
  return (
    <div>
      filter <input type="text" value={filterText} onChange={onChange} />
    </div>
  );
}
