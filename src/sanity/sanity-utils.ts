//this file is to make all function that we will be use to grab data

import { Project } from "@/types/Project";
import { createClient, groq } from "next-sanity";
// const projectId: string = process.env.SANITY_PROJECT_ID!;

export const getProjects = async (): Promise<Project[]> => {
	const client = createClient({
		projectId: "70d9r2p3",
		dataset: "production",
		apiVersion: "2021-10-21",
		useCdn: false,
	});
	return client.fetch(
		groq`*[_type=="project"]{
    _id,_createdAt,name,"slug":slug.current,"image":image.asset->url,url,content,alt
}`
	);
};
