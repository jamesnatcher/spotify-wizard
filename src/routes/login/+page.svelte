<script lang="ts">
	import { redirect_uri, client_id } from '../../stores';

	function generateRandomString(length: number) {
		let text = '';
		let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	let state = generateRandomString(16);
	let scope = 'user-read-private user-read-email user-top-read playlist-modify-public';
	let authorization_uri = 'https://accounts.spotify.com/authorize?';

	$: params = new URLSearchParams({
		response_type: 'code',
		client_id: $client_id,
		scope,
		redirect_uri: $redirect_uri,
		state
	});
	$: loginLink = authorization_uri + params;

</script>

<div class="h-screen flex items-center justify-center bg-green-100">
	<div class="grid">
		<h1 class="text-3xl font-bold underline">Log in page!</h1>
		<a href="/" class="text-lg font-meduim">"I changes my mind!"</a>
		<a href={loginLink}>
			<button class="login-btn">Connect to Spotify</button>
		</a>
		<span>
			{loginLink}
		</span>
	</div>
</div>
