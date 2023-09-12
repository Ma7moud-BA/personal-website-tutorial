import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import schemas from "./sanity/schemas";
// const projectId: string = process.env.SANITY_PROJECT_ID!;

export default defineConfig({
	projectId: "70d9r2p3",
	dataset: "production",
	title: "My Personal Website",
	basePath: "/admin",
	apiVersion: "2021-10-21",
	plugins: [deskTool()],
	schema: { types: schemas },
});
