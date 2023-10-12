function TableCell({ content }) {
  return <div className="w-32 h-16 bg-black"></div>;
}
export default function TraitsTable() {
  const cols = [1, 2, 3, 4, 5];
  const rows = [1, 2];
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-2 bg-white">
      <div className="grid grid-cols-5 gap-1 ">
        {cols.map((el, i) => (
          <TableCell key={`cell_${i}`} />
        ))}
      </div>
      <div className="h-1 w-full bg-black" />
      <div className="grid grid-cols-5 gap-1">
        {rows.map((el1, i) => {
          return cols.map((el2, j) => {
            return <TableCell key={`cell_${i}_${j}`} />;
          });
        })}
      </div>
    </div>
  );
}
