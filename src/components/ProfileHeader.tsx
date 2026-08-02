import { profile } from '@/data/contact'
import { TopAccentBar } from '@/components/CorporateDecoration'
import { HeroPortrait } from '@/components/HeroPortrait'

export function ProfileHeader() {
  return (
    <header className="relative">
      <TopAccentBar className="absolute inset-x-0 top-0 z-20 sm:rounded-t-[22px]" />

      <div className="relative z-10 flex flex-col items-center px-5 pb-4 pt-5 text-center sm:px-6 sm:pt-6">
        <img
          src="/logo.png"
          alt="O‘ZMETKOMBINAT"
          className="mt-1 h-auto w-[min(100%,248px)] select-none"
          width={248}
          height={69}
          decoding="async"
        />
      </div>

      <HeroPortrait />

      <div className="relative z-10 -mt-10 flex flex-col items-center px-5 pb-5 text-center sm:-mt-12 sm:px-6 sm:pb-6">
        <div className="max-w-[20rem]">
          <h1 className="font-display text-[1.85rem] font-semibold leading-[0.95] tracking-[0.04em] text-ink sm:text-[2rem]">
            <span className="block">{profile.displayLast}</span>
            <span className="mt-1 block text-[1.35rem] font-medium tracking-[0.035em] text-graphite sm:text-[1.45rem]">
              {profile.displayGiven}
            </span>
          </h1>

          <p className="mt-3 text-[0.95rem] font-medium leading-snug text-muted">
            {profile.title}
          </p>
          <p className="mt-1.5 font-display text-[1.05rem] font-semibold tracking-[0.06em] text-graphite">
            {profile.organization}
          </p>
        </div>
      </div>
    </header>
  )
}
