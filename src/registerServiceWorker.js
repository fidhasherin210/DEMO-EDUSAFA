import { registerSW } from 'virtual:pwa-register';

// ✅ Service Worker registration
const updateSW = registerSW({
  onRegistered(r) {
    console.log('Service Worker registered:', r);
  },
  onRegisterError(err) {
    console.error('SW registration error:', err);
  },
  onNeedRefresh() {
    console.log('New content available. Refresh to update.');
    // Optional: prompt user to reload immediately
    // if (confirm("New version available! Refresh now?")) {
    //   updateSW(true); // force SW update
    // }
  },
  onOfflineReady() {
    console.log('App ready to work offline.');
  },
});

export default updateSW;
