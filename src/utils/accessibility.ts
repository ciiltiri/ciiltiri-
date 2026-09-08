// Accessibility helper for people with visual, hearing or motor impairments

export const speakText = (text: string, lang = 'so-SO') => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }
  
  // Cancel previous speech if speaking
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  
  // Try to find Somali or Arabic or general English voice if not available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(lang) || v.lang.startsWith('ar') || v.lang.startsWith('en'));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
