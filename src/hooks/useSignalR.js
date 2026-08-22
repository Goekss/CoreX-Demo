import { useState, useRef, useEffect } from 'react';

/**
 * MOCK useSignalR — No real WebSocket connection (Demo Mode)
 * Simulates connected state, does nothing else.
 */
export function useSignalR(hubPath, { onReceive = {}, autoStart = true } = {}) {
  const [connected, setConnected] = useState(true);
  const [status, setStatus] = useState('connected');
  const [reconnectAttempt, setReconnectAttempt] = useState(0);
  const connectionRef = useRef(null);
  const onReceiveRef = useRef(onReceive);

  useEffect(() => {
    onReceiveRef.current = onReceive;
  }, [onReceive]);

  // Simulate connection after mount
  useEffect(() => {
    if (autoStart) {
      setConnected(true);
      setStatus('connected');
    }
  }, [autoStart]);

  const invoke = async (methodName, ...args) => {
    // Mock invoke - simulate ViKa AI response for SendeNachricht
    if (methodName === 'SendeNachricht' || methodName === 'SendMessage') {
      const message = args[0] || '';
      simulateVikaResponse(message, onReceiveRef.current);
    }
    return Promise.resolve();
  };

  const send = async (methodName, ...args) => invoke(methodName, ...args);

  return { connected, status, reconnectAttempt, invoke, send, connection: connectionRef.current };
}

// AI yanıt simülasyonu - chunk chunk gönderir
function simulateVikaResponse(userMessage, handlers) {
  const responses = [
    'Das ist eine Demo-Antwort von ViKa AI. In der Produktionsversion wird hier eine intelligente, kontextbezogene Antwort generiert.',
    'Ich bin ViKa, Ihr KI-Assistent. Diese Demo zeigt die Chat-Funktionalität des Vista.CoreX Systems. Im Produktionsbetrieb nutze ich RAG (Retrieval-Augmented Generation) für präzise Antworten.',
    'Vielen Dank für Ihre Nachricht! Als KI-Assistent von Vista.CoreX kann ich Ihnen bei Fragen zu Projekten, Kunden und Tickets helfen. Dies ist eine Demo-Umgebung.',
    'Gute Frage! In der vollständigen Version greife ich auf Ihre Unternehmensdaten zu und liefere kontextbezogene Analysen. Hier sehen Sie eine Vorschau der Chat-Oberfläche.',
  ];

  const response = responses[Math.floor(Math.random() * responses.length)];
  const words = response.split(' ');

  let i = 0;
  const chunkInterval = setInterval(() => {
    if (i < words.length) {
      const chunk = (i === 0 ? '' : ' ') + words[i];
      if (handlers.VikaAntwortChunk) {
        handlers.VikaAntwortChunk(chunk);
      }
      i++;
    } else {
      clearInterval(chunkInterval);
      if (handlers.VikaAntwortFertig) {
        handlers.VikaAntwortFertig();
      }
    }
  }, 80);
}
