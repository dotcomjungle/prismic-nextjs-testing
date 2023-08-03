import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { PrismicRichText } from "@prismicio/react";
import { components } from "@/slices";

type Params = { uid: string };

export const dynamicParams = false;
const clientConfig = {
    routes: [
        {
          type: 'post',
          uid: 'post',
          lang: 'en-us',
          path: '/post/:uid',    
        }
    ]
  }

export default async function Page({ params }: { params: Params }) {
  const client = createClient(clientConfig);
  const page = await client
    .getByUID("post", params.uid)
    .catch(() => notFound());

  return (
  <>
    <h1>{page.data.title}</h1>
    <article>
        <PrismicRichText field={page.data.content}/>
        <h2>Recommendations</h2>
        {page.data.recommendation.map(recommendation => {return(
            <section>
                <h3>{recommendation.type}</h3>
                <div><PrismicRichText field={recommendation.explanation}/></div>
            </section>
        )})}
    </article>
  </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient(clientConfig);
  const page = await client.getByUID("post", params.uid);

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient(clientConfig);
  const pages = await client.getAllByType("post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
