import Navbar from "@/components/base/Navbar";
import Clashing from "@/components/clash/Clashing";
import { SingleClashFetch } from "@/fetch/ClashFetch";
import { ClashFetchData } from "@/types";

async function ClashItems({ params }: { params: { id: string } }) {
  const clashId = Number(params.id);

  if (isNaN(clashId)) {
    return <div>Error: Invalid Clash ID</div>;
  }

  const clash: ClashFetchData | null = await SingleClashFetch(clashId);

  return (
    <div className=" container">
      <Navbar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold text-white">
          {clash?.title}
        </h1>
        <p className="text-lg text-white">{clash?.description}</p>
      </div>
      {clash && <Clashing clash={clash} />}
    </div>
  );
}

export default ClashItems;
