import { profile } from '@/data/contact'
import { TopAccentBar } from '@/components/CorporateDecoration'

export function ProfileHeader() {
  return (
    <header className="relative px-5 pb-5 pt-5 sm:px-6 sm:pt-6">
      <TopAccentBar className="absolute inset-x-0 top-0 rounded-t-[22px]" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <img
          src="/logo.png"
          alt="O‘ZMETKOMBINAT"
          className="mt-1 h-auto w-[min(100%,248px)] select-none"
          width={248}
          height={69}
          decoding="async"
        />

        <div className="relative mt-6">
          <div className="overflow-hidden rounded-[18px] border border-border bg-soft shadow-[0_10px_28px_rgba(30,36,48,0.10)]">
            <img
              src="/portrait-crop.png"
              alt={profile.fullName}
              className="h-[168px] w-[168px] object-cover object-[50%_18%] sm:h-[176px] sm:w-[176px]"
              width={176}
              height={176}
              decoding="async"
            />
          </div>
          <span
            className="pointer-events-none absolute -inset-px rounded-[18px] ring-1 ring-black/5"
            aria-hidden="true"
          />
        </div>

        <div className="mt-5 max-w-[20rem]">
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
