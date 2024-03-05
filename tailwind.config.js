/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: {
			'tech-mono': ['Share Tech Mono', 'monospace'],
			'major-mono': ['Major Mono Display', 'monospace']
		},
		// 'wizard-red': '#d44060',
		// 'wizard-dark': '#197c44',
		// 'wizard-light': '#19a844'
		extend: {}
	},
	plugins: [require('@tailwindcss/forms')]
};
