export interface SpotifyImage {
	url: string;
	height: number | null;
	width: number | null;
}

export interface SpotifyUserProfile {
	country?: string;
	display_name: string;
	email?: string;
	external_urls?: { spotify: string };
	followers?: { href: string | null; total: number };
	href?: string;
	id: string;
	images: SpotifyImage[];
	product?: string;
	type?: string;
	uri?: string;
}

export interface SpotifyPlaylist {
	description: string | null;
	external_urls?: { spotify: string };
	href?: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	owner?: { display_name: string; id: string };
	public: boolean | null;
	tracks?: { href: string; total: number };
	type?: string;
	uri?: string;
}

export interface SpotifyPaginatedPlaylists {
	href: string;
	items: SpotifyPlaylist[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}

export interface SpotifyArtist {
	id: string;
	name: string;
}

export interface SpotifyAlbum {
	id: string;
	name: string;
	images: SpotifyImage[];
}

export interface SpotifyTrack {
	id: string;
	name: string;
	artists: SpotifyArtist[];
	album: SpotifyAlbum;
}

export interface SpotifyPlaylistTrackItem {
	track: SpotifyTrack | null;
}

export interface SpotifyPaginatedPlaylistTracks {
	href: string;
	items: SpotifyPlaylistTrackItem[];
	limit: number;
	next: string | null;
	offset: number;
	previous: string | null;
	total: number;
}
