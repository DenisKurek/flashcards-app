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
      {sets.map((set, index) => (
        <li className=" list-group-item m-2" key={index}>
          {set.title}
        </li>
      ))}
    </ul>
  );
};

export default SetsList;
