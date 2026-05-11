export type EleventyProps = {
	// eleventy-defined stuff
	page: Page;
	eleventy: { version: string; generator: string; env: any };
	content: string;
	collections: Record<string, Array<Page>>;
	date: Date;
} & FrontEndMatter;

export type Page = {
	url: string;
	fileSlug: string;
	filePathStem: string;
	inputPath: string;
	outputPath: string;
	outputFileExtension: string;
	date: Date;

	data: FrontEndMatter;
};

export type NavItem = {
	url: string;
	label: string;
};

export type FrontEndMatter = {
	title?: string;
	description?: string;
	nav?: Record<string, NavItem>;
	navKey?: string;
	tags?: Array<string>;
};
