import { getPage } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import React from "react";
type PageSlugProps = {
	params: { page_slug: string };
};
const PageSlug = async ({ params }: PageSlugProps) => {
	const slug = params.page_slug;
	const page = await getPage(slug);
	return (
		<div>
			<h1>{page.title}</h1>
			<PortableText value={page.content} />
		</div>
	);
};

export default PageSlug;
