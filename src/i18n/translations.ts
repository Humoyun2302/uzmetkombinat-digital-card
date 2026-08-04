export type Language = 'uz' | 'ru' | 'en' | 'zh'

export type TranslationStrings = {
  displayLast: string
  displayGiven: string
  position: string
  organization: string
  phone: string
  telegram: string
  wechat: string
  wikipedia: string
  email: string
  website: string
  saveContact: string
  copied: string
  contactsSection: string
}

export const translations: Record<Language, TranslationStrings> = {
  uz: {
    displayLast: 'ABDULLAYEV',
    displayGiven: 'BAXODIR TOJIMIRZAYEVICH',
    position: 'Boshqaruv raisi – Bosh Direktori',
    organization: '“O‘ZMETKOMBINAT” AJ',
    phone: 'Qo‘ng‘iroq qilish',
    telegram: 'Telegram',
    wechat: 'WeChat',
    wikipedia: 'Vikipediya',
    email: 'Email',
    website: 'Rasmiy veb-sayt',
    saveContact: 'Kontaktni saqlash',
    copied: 'Nusxalandi',
    contactsSection: "Aloqa ma'lumotlari",
  },
  ru: {
    displayLast: 'АБДУЛЛАЕВ',
    displayGiven: 'БАХОДИР ТОЖИМИРЗАЕВИЧ',
    position: 'Председатель Правления — Генеральный директор',
    organization: 'АО «УЗМЕТКОМБИНАТ»',
    phone: 'Позвонить',
    telegram: 'Telegram',
    wechat: 'WeChat',
    wikipedia: 'Википедия',
    email: 'Электронная почта',
    website: 'Официальный сайт',
    saveContact: 'Сохранить контакт',
    copied: 'Скопировано',
    contactsSection: 'Контактная информация',
  },
  en: {
    displayLast: 'Abdullayev',
    displayGiven: 'Baxodir Tojimirzayevich',
    position: 'Chairman of the Board – General Director',
    organization: '“UZMETKOMBINAT” JSC',
    phone: 'Call',
    telegram: 'Telegram',
    wechat: 'WeChat',
    wikipedia: 'Wikipedia',
    email: 'Email',
    website: 'Official website',
    saveContact: 'Save contact',
    copied: 'Copied',
    contactsSection: 'Contact information',
  },
  zh: {
    displayLast: 'ABDULLAYEV',
    displayGiven: 'BAXODIR TOJIMIRZAYEVICH',
    position: '管理委员会主席兼总经理',
    organization: '“UZMETKOMBINAT”股份公司',
    phone: '电话',
    telegram: 'Telegram',
    wechat: '微信',
    wikipedia: '维基百科',
    email: '电子邮箱',
    website: '官方网站',
    saveContact: '保存联系人',
    copied: '已复制',
    contactsSection: '联系方式',
  },
}

export const languageOptions: Array<{
  code: Language
  label: string
}> = [
  { code: 'uz', label: 'UZ' },
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'zh', label: '中文' },
]

export const LANGUAGE_STORAGE_KEY = 'preferredLanguage'

export function isLanguage(value: string | null): value is Language {
  return value === 'uz' || value === 'ru' || value === 'en' || value === 'zh'
}
