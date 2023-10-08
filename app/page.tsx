import AddSetButton from "@/components/AddSetButton";
import SetsList from "@/components/SetsList";
import "bootstrap/dist/css/bootstrap.css";
export default function HomePage() {
  return (
    <div className="card justify-content-center bg-dark-subtle">
      <AddSetButton />
      <SetsList />
    </div>
  );
}
