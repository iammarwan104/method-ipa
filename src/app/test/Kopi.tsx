export default function Kopi() {

  return (
    <>
      <h1>Komponent Kopi</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full bg-cuslor-4">kopi</div>
        <div className="w-full bg-cuslor-4">kopi</div>
        <div className="w-full bg-cuslor-4 col-start-1 col-end-3">kopi</div>
      </div>
    </>
  );
}
