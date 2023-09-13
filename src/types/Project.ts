import { PortableTextBlock } from "sanity";

export type Project = {
	url: string;
	content: PortableTextBlock[];
	_id: string;
	_createdAt: string;
	name: string;
	slug: string;
	image: string;
	alt: string;
};
