/**
 * Shipment window utility — NOT a server action.
 * Calculates the current Friday→Wednesday 23:59:59 (Europe/London) shipment window.
 */

export function getUKOffsetMs(utcDate: Date): number {
  const ukStr = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false,
  }).format(utcDate);
  const m = ukStr.match(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/);
  if (!m) return 0;
  const [, d, mo, y, h, mi] = m.map(Number);
  const ukLocal = Date.UTC(y, mo - 1, d, h, mi, 0);
  return ukLocal - utcDate.getTime();
}

export function getShipmentWindow(now: Date = new Date()): {
  weekStart: Date;
  cutoffDate: Date;
  weekLabel: string;
} {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parseInt(parts.find(p => p.type === t)!.value);
  const year = get('year');
  const month = get('month') - 1;
  const day = get('day');
  const hour = get('hour');
  const minute = get('minute');

  const ukDate = new Date(Date.UTC(year, month, day, hour, minute));
  const dow = ukDate.getUTCDay(); // 0=Sun, 5=Fri

  // Days back to most recent Friday
  const daysFromFriday = dow >= 5 ? dow - 5 : dow + 2;
  const fridayUK = new Date(ukDate);
  fridayUK.setUTCDate(ukDate.getUTCDate() - daysFromFriday);
  fridayUK.setUTCHours(0, 0, 0, 0);

  // Days forward to Wednesday (day 3) from Friday (day 5)
  const daysToWed = (3 - fridayUK.getUTCDay() + 7) % 7 || 7;
  const wednesdayUK = new Date(fridayUK);
  wednesdayUK.setUTCDate(fridayUK.getUTCDate() + daysToWed);
  wednesdayUK.setUTCHours(23, 59, 59, 999);

  // Convert to real UTC
  const weekStartUTC = new Date(fridayUK.getTime() - getUKOffsetMs(fridayUK));
  const cutoffUTC = new Date(wednesdayUK.getTime() - getUKOffsetMs(wednesdayUK));

  // ISO week label
  const jan4 = new Date(Date.UTC(year, 0, 4));
  const weekNum = Math.ceil(
    ((fridayUK.getTime() - jan4.getTime()) / 86400000 + jan4.getUTCDay() + 1) / 7
  );
  const weekLabel = `WK-${year}-W${String(weekNum).padStart(2, '0')}`;

  return { weekStart: weekStartUTC, cutoffDate: cutoffUTC, weekLabel };
}
