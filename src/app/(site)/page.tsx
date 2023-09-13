import { getPages, getProjects } from "@/sanity/sanity-utils";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
	const projects = await getProjects();
	const pages = await getPages();
	console.log(pages);
	return (
		<div>
			<h1 className="text-7xl font-extrabold">
				Hello I&apos;m{" "}
				<span className="bg-gradient-to-r from-green-400  to-yellow-400 bg-clip-text text-transparent">
					MahmoudBA
				</span>
			</h1>
			<p className="mt-3 text-xl text-gray-600">check out my projects!</p>
			<h2 className="mt-24 font-bold text-gray-700 text-3xl"> My Projects</h2>
			<div className="mt-5 grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-8">
				{projects.map((project) => {
					return (
						<Link
							href={`/projects/${project.slug}`}
							key={project._id}
							className="border-2 border-gray-500 rounded-lg p-1 flex flex-col justify-between  hover:scale-105 hover:border-green-500 transition"
						>
							{project.image && (
								<Image
									src={project.image}
									alt={project.alt}
									width={750}
									height={300}
									className="object-cover rounded-lg border border-gray-500"
								></Image>
							)}
							<div className="mt-2 text-3xl font-extrabold  bg-gradient-to-r from-green-400  to-yellow-400 bg-clip-text text-transparent">
								{project.name}
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
