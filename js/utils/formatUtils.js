export function getUptime(startTime) {
    const diff = Math.abs(new Date() - startTime);
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
}