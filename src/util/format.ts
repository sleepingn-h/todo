export function formatDateISO(date: Date): string {
  return new Date(date).toISOString();
}

export function formatDateToLocale(date: Date, lang: string): string {
  return new Date(date).toLocaleDateString(lang);
}

export function formatPriorityToLocale(priority: string): string {
  switch (priority) {
    case 'urgent':
      return '긴급';
    case 'normal':
      return '일반';
    case 'low':
      return '낮음';
    default:
      console.log(priority);
      throw new Error(`알수 없는 ${priority} 값입니다.`);
  }
}
