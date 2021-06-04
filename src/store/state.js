const defaults = {
  title: 'Songtool',
  locales: [
    {
      name: 'de',
      text: 'Deutsch',
    },
  ],
  defaultLocale: 'de',
  iconfont: 'md',
  primaryTheme: 'dark',
  secondaryTheme: 'dark',
  theme: {
    primary: '#34495e',
    secondary: '#41b883',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
}

const params = Object.assign(defaults)

const state = {
  title: params.title,
  locale: localStorage.getItem('locale'),
  defaultLocale: params.defaultLocale,
  locales: params.locales,
  primaryTheme: params.primaryTheme,
  secondaryTheme: params.secondaryTheme,
  alert: {
    show: false,
    color: '',
    text: '',
    icon: '',
  },
}

export default state
