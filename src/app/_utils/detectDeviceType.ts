export function detectDeviceType() {
  if (typeof window !== 'undefined') {
    const ua = navigator.userAgent;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
        return "mobile";
    }
  }

  return "desktop";
}
