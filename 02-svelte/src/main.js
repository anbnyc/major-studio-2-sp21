import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		height: 200,
		width: 300
	},
	intro: true // apply the 'in:' transition on mount
});

export default app;