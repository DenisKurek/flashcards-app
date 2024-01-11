import SetSearchForm from "@/components/SerchSetForm";
import { getAllTags } from "@/lib/api-requests/Tag-requests";

export default async function FindSet() {
  const tags: string[] = await getAllTags();
  return <SetSearchForm tags={tags} />;
}
