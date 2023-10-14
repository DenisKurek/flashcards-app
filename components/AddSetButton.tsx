import Link from "@/node_modules/next/link";
const AddSetButton = () => {
  return (
    <div className="container d-flex justify-content-end">
      <Link href={"new-set"} className=" text-decoration-none  fs-4">
        Create new Set
      </Link>
    </div>
  );
};

export default AddSetButton;
