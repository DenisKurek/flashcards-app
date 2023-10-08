const elements = [
  {
    concept: "ala",
    definition: "ma",
  },
  {
    concept: "ala",
    definition: "ma",
  },
  {
    concept: "ala",
    definition: "ma",
  },
  {
    concept: "ala",
    definition: "ma",
  },
];
export default function HomePage() {
  return (
    <div className="h-100 card justify-content-center bg-dark-subtle">
      <ul className=" h-100">
        {elements.map((flashCard) => (
          <div className=" d-flex  justify-content-around">
            <input type="text" value={flashCard.concept} />
            <input type="text" value={flashCard.definition} />
          </div>
        ))}
        <div className=" d-flex  justify-content-around">
          <input type="text" />
          <input type="text" />
        </div>
      </ul>
    </div>
  );
}
