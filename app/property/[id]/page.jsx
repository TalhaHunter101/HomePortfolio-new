import Footer from "@/components/common/Footer/Footer";
import PropertyDisplay from "@/components/Property/PropertyDisplay";

export async function generateMetadata({ params }) {
  const id = params?.id?.split("%3D")?.[1];
  const { res } = await getData(id);

  if (!res || !res?._source) {
    return {
      title: "Homeprotfolio",
      openGraph: {
        title: "Homeprotfolio",
      },
      description: "",
    };
  }

  const fullAddress =
    res?._source?.metaTitle ||
    res?._source?.analyticsTaxonomy?.displayAddress ||
    "Homeprotfolio property";
  const title =
    fullAddress?.length > 60
      ? `${fullAddress?.substring(0, 60)}...`
      : fullAddress;

  const description = res?._source?.metaDescription || "";

  return {
    title,
    openGraph: {
      title,
    },
    description,
  };
}

async function getData(id) {
  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_SITE_URL}/api/indevisual/get-listing-by-id`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ listingId: id }),
    }
  );

  const res = await response?.json();
  return { res };
}

export default async function page({ params }) {
  const id = params?.id?.split("%3D")?.[1];
  const { res } = await getData(id);

  return (
    <>
      <PropertyDisplay listingData={res?._source} params={params} />
      <Footer />
    </>
  );
}
