import { useState, useEffect } from 'react';
import { mockSocket } from '../services/mockSocket';
import { MatchData, MatchEvent } from '../types';

export function useLiveMatchData() {
  const [match, setMatch] = useState<MatchData | null>(mockSocket.getMatchData());
  const [events, setEvents] = useState<MatchEvent[]>([]);

  useEffect(() => {
    const handleUpdate = (data: MatchData) => setMatch(data);
    const handleNewEvent = (event: MatchEvent) => {
      setEvents(prev => [event, ...prev].slice(0, 50));
    };

    mockSocket.on('match_update', handleUpdate);
    mockSocket.on('new_event', handleNewEvent);

    return () => {
      mockSocket.off('match_update', handleUpdate);
      mockSocket.off('new_event', handleNewEvent);
    };
  }, []);

  return { match, events };
}
