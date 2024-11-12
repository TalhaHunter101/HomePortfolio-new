import React from "react";
import IndevisualAgentpage from "@/components/agent/IndevisualAgentpage";

// export async function generateMetadata({ params }) {
//   const id = params?.id?.split("%3D")?.[1];
//   const { res } = await getData(id);

//   if (!res || !res?._source) {
//     return {
//       title: "Homeprotfolio",
//       openGraph: {
//         title: "Homeprotfolio",
//       },
//       description: "",
//     };
//   }

//   const fullAddress =
//     res?._source?.metaTitle ||
//     res?._source?.analyticsTaxonomy?.displayAddress ||
//     "Homeprotfolio property";
//   let title =
//     fullAddress?.length > 60
//       ? `${fullAddress?.substring(0, 60)}...`
//       : fullAddress;
//   title = title.replace(/Zoopla/g, "Homeprotfolio");

//   let description = res?._source?.metaDescription || "";
//   description = description.replace(/Zoopla/g, "Homeprotfolio");

//   return {
//     title,
//     openGraph: {
//       title,
//     },
//     description,
//   };
// }

async function getData(id) {
  const response = await fetch(
    `${process?.env?.NEXT_PUBLIC_SITE_URL}/api/agents/get-indevisual-agent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ agentId: id }),
    }
  );
  const res = await response?.json();
  return { res };
}

export default async function page({ params }) {
  const name = params.name;
  const id =  name.split("-").pop();
  const { res } = await getData(id);  

  const agentName = name
    .split("-")
    .slice(0, -1)
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

    

  return (
    <>
      <IndevisualAgentpage data={res} name={agentName} id={id} />
    </>
  );
}
