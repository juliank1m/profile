import './MusicPlayer.css'

// To change what's playing: open in Spotify → Share → Copy link → paste the
// ID after /playlist/, /album/, or /track/ below, and update the path
// segment to match (`embed/playlist`, `embed/album`, or `embed/track`).
const SPOTIFY_EMBED_URL =
  'https://open.spotify.com/embed/playlist/2Oa3dwLVivGi080wtyNtk6?utm_source=generator&theme=0'

/**
 * Spotify-backed music widget. Visitors signed in to Spotify hear full
 * tracks; everyone else gets 30-second previews. The pixel-style window
 * chrome (drag bar, dock icon, minimize) is provided by FloatingWindow —
 * this component just renders the embed itself.
 */
export default function MusicPlayer() {
  return (
    <iframe
      title="Spotify player"
      className="fw-music-iframe"
      src={SPOTIFY_EMBED_URL}
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  )
}
