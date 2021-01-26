import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		height: 200,
		width: 300
	}
});

export default app;