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

export const code = readable("", function start(set) {
  if (window){
    if(window.location.href){
      const indexOfHostName = window.location.href.indexOf("code")
      const params = window.location.href.slice(indexOfHostName, window.location.href.length)
      const search_params = new URLSearchParams(params)
      if (search_params.has("code")){
        set(search_params.get("code") || "")
        window.history.pushState("object or string", "Title", "/home");

      }
    }
  }
})


export const token = writable(null)

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

export const tokenExpired = writable(false);

export const user = writable(null);

export const redirect_wrote = writable(false);

export const redirect_uri = writable(PUBLIC_APP_URL + "home");

export const client_id = writable('8602d91b2c7e4d848d3d1e12657a441d');

export const playlist_page_target = writable("");