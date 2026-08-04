import { useContent } from '@/content/ContentContext'

export function HeroPortrait() {
  const { content } = useContent()

  return (
    <div className="hero-portrait">
      <img
        src={content.profile.photoUrl}
        alt={content.profile.fullName}
        className="hero-portrait__image"
        width={655}
        height={629}
        decoding="async"
      />
      <div className="hero-portrait__fade" aria-hidden="true" />
    </div>
  )
}
