const sets = [
  {
    title: "set1",
  },
  {
    title: "set1",
  },
  {
    title: "set1",
  },
  {
    title: "set1",
  },
  {
    title: "set1",
  },
];

const SetsList = () => {
  return (
    <ul className=" list-group d-flex justify-content-evenly">
      <div className="row">
        {sets.map((set, index) => (
          <li className=" list-group-item m-2" key={index}>
            {set.title}
          </li>
        ))}
      </div>
    </ul>
  );
};

export default SetsList;
