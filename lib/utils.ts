// Shared utility functions that work on both client and server

export function formatDate(dateString: string): string {
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function getSessionTypeColor(type: string): string {
  const colors: Record<string, string> = {
    talk: 'bg-flame-500/10 text-flame-600 dark:text-flame-400',
    workshop: 'bg-olive-500/10 text-olive-600 dark:text-olive-400',
    panel: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    demo: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    break: 'bg-gray-500/10 text-gray-600 dark:text-gray-400',
    social: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
  };
  return colors[type] || colors.talk;
}
