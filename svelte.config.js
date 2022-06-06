import adapter from "@sveltejs/adapter-auto";

const config = {
	kit: {
		adapter: adapter(),
    vite: {
      plugins: []
    }
	}
};

export default config;
