import { readable, writable } from 'svelte/store';
import { PUBLIC_APP_URL } from '$env/static/public';

// export const token = readable(null, function start(set) {
//   const hashParams = {};
//   const r = /([^&;=]+)=?([^&;]*)/g;
//   const q = window.location.hash.substring(1);
//   let e;
//   while (e = r.exec(q)) {
//     hashParams[e[1]] = decodeURIComponent(e[2]);
//   }
//   const access_token = hashParams.access_token;
//   set(access_token);

//   window.history.pushState("object or string", "Title", "/");

// })

// export const code = writable(null);
// // window.history.pushState("object or string", "Title", "/");

export const token = writable(null);

// export const token = readable("", function start(set) {
//   if (window){
//     if(window.location.href){
//       const params = window.location.href.slice(23, window.location.href.length)
//       const search_params = new URLSearchParams(params)
//       if (search_params.has("token")){
//         set(search_params.get("token") || "")
//         window.history.pushState("object or string", "Title", "/");

//       }
//     }
//   }
// })

export const timeRange = writable('medium_term');

export const redirect_wrote = writable(false);

export const redirect_uri = writable(PUBLIC_APP_URL + 'home');

export const playlistPageOffset = writable(0);

export const playlist_page_target = writable('');

export const appUrl = readable(String(), function start(set) {
	set(PUBLIC_APP_URL);
});

export const accessToken = writable(null);
export const refreshToken = writable(null);
export const user = writable(null);

export const tokenExpired = writable(false);
