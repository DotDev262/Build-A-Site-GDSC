import { useCallback } from 'react';

export function useSound() {
  const playAlarm = useCallback(() => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
    oscillator.stop(audioContext.currentTime + 1);

    // Vibration API for mobile devices
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200]);
    }
  }, []);

  return { playAlarm };
}
