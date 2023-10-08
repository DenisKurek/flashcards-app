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
    <ul className=" list-group">
      {sets.map((set, index) => (
        <li className=" list-group-item" key={index}>
          {set.title}
        </li>
      ))}
    </ul>
  );
};

export default SetsList;
