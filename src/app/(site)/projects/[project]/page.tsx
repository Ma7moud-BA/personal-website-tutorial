import { getProject } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import React from "react";
import Image from "next/image";
type ProjectProps = {
	params: { project: string };
};

const Project = async ({ params }: ProjectProps) => {
	const slug = params.project;
	const project = await getProject(slug);

	return (
		<div>
			<header className="flex items-center justify-between">
				<h1 className="text-5xl drop-shadow-sm font-extrabold bg-gradient-to-r from-green-400  to-yellow-400 bg-clip-text text-transparent">
					{project.name}
				</h1>
				<a
					href={project.url}
					title="View Project"
					target="_blank"
					rel="noopener noreferrer"
					className="p-2 bg-gray-100 rounded-lg text-gray-500 hover:bg-green-500 hover:text-white  transition font-bold py-3 whitespace-nowrap"
				>
					View Project
				</a>
			</header>
			{/*  use this comopnent for the portable text since the content is portable text */}
			<div className="text-lg text-gray-700 mt-5">
				<PortableText value={project.content}></PortableText>
			</div>
			{project.image && (
				<Image
					src={project.image}
					alt={project.alt}
					width={750}
					height={300}
					className="object-cover rounded-xl border-2 mt-10 border-gray-500"
				></Image>
			)}
		</div>
	);
};

export default Project;
