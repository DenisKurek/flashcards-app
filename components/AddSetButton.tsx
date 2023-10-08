import Link from "@/node_modules/next/link";
const AddSetButton = () => {
  return (
    <Link href={"new-set"} className=" btn-primary justify-content-center">
      Create new Set
    </Link>
  );
};

export default AddSetButton;
