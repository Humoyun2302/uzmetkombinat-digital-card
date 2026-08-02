export const profile = {
  firstName: 'Baxodir',
  lastName: 'Abdullayev',
  middleName: 'Tojimirzayevich',
  fullName: 'Abdullayev Baxodir Tojimirzayevich',
  displayLast: 'ABDULLAYEV',
  displayGiven: 'BAXODIR TOJIMIRZAYEVICH',
  title: 'Boshqaruv raisi – Bosh Direktori',
  organization: '“O‘ZMETKOMBINAT” AJ',
  organizationPlain: 'O‘ZMETKOMBINAT AJ',
  phones: [
    {
      id: 'phone-main',
      label: 'Qo‘ng‘iroq qilish',
      display: '+998 50 710 88 88',
      tel: '+998507108888',
      href: 'tel:+998507108888',
    },
    {
      id: 'phone-alt',
      label: 'Qo‘ng‘iroq qilish',
      display: '+998 95 778 88 88',
      tel: '+998957788888',
      href: 'tel:+998957788888',
    },
  ],
  telegram: {
    label: 'Telegram',
    display: '@UMK_boshqaruv_rayisi',
    href: 'https://t.me/UMK_boshqaruv_rayisi',
    copyValue: '@UMK_boshqaruv_rayisi',
  },
  email: {
    label: 'Email',
    display: 'B_ABDULLAYEV@UZBEKSTEEL.UZ',
    href: 'mailto:B_ABDULLAYEV@UZBEKSTEEL.UZ',
    copyValue: 'B_ABDULLAYEV@UZBEKSTEEL.UZ',
  },
  website: {
    label: 'Rasmiy veb-sayt',
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
    `EMAIL;TYPE=INTERNET:${profile.email.copyValue}`,
    `URL:${profile.website.href}`,
    'END:VCARD',
  ]
  return lines.join('\r\n')
}
