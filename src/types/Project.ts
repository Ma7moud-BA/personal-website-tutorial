import { PortableTextBlock } from "sanity";

export type Project = {
	url: URL;
	content: PortableTextBlock[];
	_id: string;
	_createdAt: string;
	name: string;
	slug: string;
	image: string;
	alt: string;
};
