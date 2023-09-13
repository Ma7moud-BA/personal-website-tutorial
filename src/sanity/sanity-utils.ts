//this file is to make all function that we will be use to grab data

import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
import config from "./config/clinet-config";
import { Page } from "@/types/Page";
// const projectId: string = process.env.SANITY_PROJECT_ID!;

export const getProjects = async (): Promise<Project[]> => {
	const client = createClient(config);

	return client.fetch(
		groq`*[_type=="project"]{
    _id,_createdAt,name,"slug":slug.current,"image":image.asset->url,url,content,alt
}`
	);
};

export const getProject = async (slug: string): Promise<Project> => {
	const client = createClient(config);
	return client.fetch(
		groq`*[_type=="project" && slug.current==$slug][0]{
    _id,_createdAt,name,"slug":slug.current,"image":image.asset->url,url,content,alt
}`,
		{ slug }
	);
};

export const getPages = async (): Promise<Page[]> => {
	const client = createClient(config);
	return client.fetch(
		groq`*[_type=="page"]{
    _id,
	_createdAt,
	title,
	"slug":slug.current,
	
}`
	);
};

export const getPage = async (slug: string): Promise<Page> => {
	const client = createClient(config);
	return client.fetch(
		groq`*[_type=="page" && slug.current==$slug][0]{
    _id,
	_createdAt
	,title,
	"slug":slug.current,
	content,	
}`,
		{ slug }
	);
};
