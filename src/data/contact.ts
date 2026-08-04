export const profile = {
  firstName: 'Baxodir',
  lastName: 'Abdullayev',
  middleName: 'Tojimirzayevich',
  fullName: 'Abdullayev Baxodir Tojimirzayevich',
  displayLast: 'ABDULLAYEV',
  displayGiven: 'BAXODIR TOJIMIRZAYEVICH',
  title: 'Boshqaruv raisi – Bosh Direktori',
  organizationPlain: 'O‘ZMETKOMBINAT AJ',
  phones: [
    {
      id: 'phone-main',
      display: '+998 50 710 88 88',
      tel: '+998507108888',
      href: 'tel:+998507108888',
    },
    {
      id: 'phone-alt',
      display: '+998 95 778 88 88',
      tel: '+998957788888',
      href: 'tel:+998957788888',
    },
  ],
  telegram: {
    display: '@UMK_boshqaruv_rayisi',
    href: 'https://t.me/UMK_boshqaruv_rayisi',
  },
  wechat: {
    href: 'https://u.wechat.com/MMOzaqclBtpaXsYc7PV3UYI?s=2',
  },
  wikipedia: {
    href: 'https://uz.wikipedia.org/wiki/Bahodir_Abdullayev',
  },
  email: {
    display: 'B_ABDULLAYEV@UZBEKSTEEL.UZ',
    href: 'mailto:B_ABDULLAYEV@UZBEKSTEEL.UZ',
  },
  website: {
    display: 'www.uzbeksteel.uz',
    href: 'https://www.uzbeksteel.uz',
  },
} as const

export function buildVCard(): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${profile.lastName};${profile.firstName};${profile.middleName};;`,
    `FN:${profile.fullName}`,
    `ORG:${profile.organizationPlain}`,
    `TITLE:${profile.title}`,
    `TEL;TYPE=CELL,VOICE:${profile.phones[0].tel}`,
    `TEL;TYPE=CELL,VOICE:${profile.phones[1].tel}`,
    `EMAIL;TYPE=INTERNET:${profile.email.display}`,
    `URL:${profile.website.href}`,
    'END:VCARD',
  ]
  return lines.join('\r\n')
}
