import { profile } from '@/data/contact'

export function HeroPortrait() {
  return (
    <div className="hero-portrait">
      <img
        src="/assets/IMG_20260803_151322_257.jpg"
        alt={profile.fullName}
        className="hero-portrait__image"
        width={655}
        height={629}
        decoding="async"
      />
      <div className="hero-portrait__fade" aria-hidden="true" />
    </div>
  )
}
