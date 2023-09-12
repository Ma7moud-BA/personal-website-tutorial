# Sanity V3

Sanity is an open-source content management system (CMS) that allows developers and content creators to collaboratively manage structured content for websites, apps, and digital projects. Sanity offers a robust solution for building, customizing, and delivering content-driven experiences.

## Installation

install sanity studio in a separate folder from your app then link it run the commands:

- npm create sanity@latest
- cd (into the sanity-studio file dir)
- npm run dev

# Overview

- The studio is a web app that is written in react, it runs locally on your computer where you can edit it and customize it.
- The studio is connected to a real-time content link.
- There is no local content so what you do get synced automatically.
  so we can deploy the studio to the web once we think it's ready to use and once we have our updates we won't be deploying this separate from the next app because we are embedding it so once its deployed we will have the online version to work with content.
- You can invite others and collaborate.

# Steps

1. Head over to manage.sanity.io and there you can manage your studio and control it, you can add collaborators and other things
2. in the api section add localhost:3000 to the `CORS` origins to allow the next app to interact with the studio
3. To query for the content we are going to use `GROQ` " Graph-Relational Object Queries: is an open source query language, it lets you query any collection of json data and filter them down to exactly to what you need by their properties and values ", you can also use `graphql`.
4. In the local version of sanity studio at localhost:3333/vision you can write the query and hit fetch to see what result you will ge back

# Imbedding Sanity to Next

1. stop the server for sanity
2. In the next project install sanity and next-sanity package `npm install sanity next-sanity`
3. create a sanity.config.ts at the root of your project `Note: if you use the src directory the sanity.config.ts should be in it` in that file import `{defineConfig} from sanity` and `{deskTool} from sanity/desk`, then write the following configuration

```javascript
import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
export default defineConfig({
	projectId: process.env.SANITY_PROJECT_ID!,
	dataset: "production",
	title: "project title",
	basePath: "/admin",
	plugins: [deskTool()],
});
```

- basePath
  is the url for where we want our sanity studio to live, so if you have a website and you want to have people edit content at /admin then make the basePath:/admin
- deskTool
  is a top level view within the sanity studio we need this plugin to view our studio

4. make a catch all routes for /admin so anything you type after /admin gets sent to one route `admin/[[...index]]/page.tsx` this will catch /admin and /admin/anything/anything.....
5. turn this route to a client page import `{NextStudio} from "next-sanity/studio` component and the configuration you made from the sanity.config file`import config from "@sanity.config`
   this page should return the `<NextStudio>` component with the configuration

6. head over to localhost:3000/admin and you should see the studio running

```javascript
"use client";
import React from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
const AdminPage = () => {
	return <NextStudio config={config} />;
};

export default AdminPage;
```

# Creating Schemas

1. create a folder in the src directory and name it sanity, in that folder make a schemas folder to hold all the project schemas
2. create a schema file

```javascript
const project = {
	name: "project",
	title: "Projects",
	type: "document",
	fields: [
		{ name: "name", title: "Name", type: "string" },
		{ name: "slug", title: "Slug", type: "slug", options: { source: "name" } },
		{
			name: "image",
			title: "Image",
			type: "image",
			options: { hotspot: true },
			fields: [
				{
					name: "alt",
					title: "Alt",
					type: "string",
				},
			],
		},
		{ name: "url", title: "URL", type: "url" },
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
	],
};

export default project;
```

check out the official docs for more infos about schemas

3. create an index file to export the schemas all at once for easier importing
4. import the schemas from the schemas/index into the sanity.config file
5. head over to the studio to see the project schema.
6. add few projects

# Creating Utilities for grabbing data

1. create a sanity-utils.ts file in the sanity folder
2. import `'createClient' and 'groq' from next-sanity`
3. create a function to fetch the data
4. construct a client to interact with the data, provide the project id and other configurations
5. write the groq query for this function
6. call this function where ever you want in the app to get the data

```javascript
export const getProjects = async () => {
	const client = createClient({
		projectId: "70d9r2p3",
		dataset: "production",
		apiVersion: "2021-10-21",
	});
	return client.fetch(
		groq`*[_type=="project"]{
    _id,_createdAt,name,"slug":slug.current,"image":image.asset->url,url,content
}`
	);
};
```
