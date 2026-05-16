import { MatchEvent, MatchData } from '../types';

type Listener = (data: any) => void;

class MockSocket {
  private listeners: { [key: string]: Listener[] } = {};
  private interval: any = null;
  private matchData: MatchData = {
    id: 'm1',
    homeTeam: 'CSK',
    awayTeam: 'RCB',
    homeScore: 172,
    homeWickets: 4,
    homeOvers: '18.4',
    awayScore: 168,
    awayWickets: 9,
    awayOvers: '20.0',
    status: 'LIVE',
    currentInnings: 2,
    excitement: 95,
    momentum: -60,
    batsmen: [
      { name: 'Ruturaj Gaikwad', runs: 82, balls: 48 },
      { name: 'MS Dhoni', runs: 15, balls: 7 }
    ],
    bowler: { name: 'Mohan Siraj', overs: '3.4', wickets: 2, runs: 32 }
  };

  constructor() {
    this.startSimulation();
  }

  private startSimulation() {
    this.interval = setInterval(() => {
      // Simulate over/ball increment
      const [overs, balls] = this.matchData.homeOvers.split('.').map(Number);
      let nextBalls = balls + 1;
      let nextOvers = overs;
      if (nextBalls >= 6) {
        nextBalls = 0;
        nextOvers += 1;
      }
      this.matchData.homeOvers = `${nextOvers}.${nextBalls}`;

      // Random runs (more realistic distribution)
      const runOptions = [0, 0, 1, 1, 1, 1, 2, 3, 4, 6];
      const runs = runOptions[Math.floor(Math.random() * runOptions.length)];
      this.matchData.homeScore += runs;
      
      const currentBatsman = this.matchData.batsmen[0];
      currentBatsman.runs += runs;
      currentBatsman.balls += 1;

      // Random events based on runs
      if (runs === 6) {
        this.generateEvent('SIX');
      } else if (runs === 4) {
        this.generateEvent('FOUR');
      } else if (Math.random() > 0.9) {
        this.generateEvent('WICKET');
      } else if (Math.random() > 0.97) {
        this.generateEvent('DARE');
      } else if (Math.random() > 0.95) {
        this.generateEvent('MEME');
      }

      // Random momentum/excitement shifts
      this.matchData.momentum = Math.max(-100, Math.min(100, this.matchData.momentum + (Math.random() - 0.5) * 15));
      this.matchData.excitement = Math.max(0, Math.min(100, this.matchData.excitement + (Math.random() - 0.5) * 10));
      
      this.emit('match_update', { ...this.matchData });
    }, 6000);
  }

  private generateEvent(forcedType?: string) {
    const types: ('SIX' | 'FOUR' | 'WICKET' | 'NOBALL' | 'MEME' | 'DARE')[] = ['SIX', 'FOUR', 'WICKET', 'NOBALL', 'MEME', 'DARE'];
    const type = forcedType || types[Math.floor(Math.random() * types.length)];
    
    let title = '';
    let description = '';

    switch (type) {
      case 'SIX':
        title = 'MASSIVE SIX! 🚀';
        description = `${this.matchData.batsmen[0].name} clears the stadium!`;
        break;
      case 'FOUR':
        title = 'CRACKING FOUR! 🏏';
        description = 'Timed to perfection through the covers.';
        break;
      case 'WICKET':
        this.matchData.homeWickets++;
        title = 'OUT! WICKET! ☝️';
        description = 'The finger goes up! Big blow for the batting side.';
        break;
      case 'NOBALL':
        this.matchData.homeScore += 1;
        title = 'NO BALL! 🚨';
        description = 'Bowler oversteps. Free hit coming up!';
        break;
      case 'MEME':
        title = 'Viral Reaction Video';
        description = 'Fans in the stands are going wild!';
        break;
      case 'DARE':
        const dares = [
          "Do 10 pushups on camera!",
          "Post your most used emoji in chat!",
          "Reveal your last mobile notification!",
          "Sing your team's anthem out loud!",
          "Wear a funny hat for the next 2 overs!"
        ];
        title = 'CRITICAL DARE! 🔥';
        description = dares[Math.floor(Math.random() * dares.length)];
        break;
    }

    const event: MatchEvent = {
      id: Math.random().toString(36).substr(2, 9),
      type: type as any,
      timestamp: Date.now(),
      minute: this.matchData.homeOvers,
      title,
      description,
    };

    this.emit('new_event', event);
  }

  public getMatchData(): MatchData {
    return { ...this.matchData };
  }

  public on(event: string, callback: Listener) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  public off(event: string, callback: Listener) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(l => l !== callback);
  }

  private emit(event: string, data: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(l => l(data));
  }

  public stop() {
    clearInterval(this.interval);
  }
}

export const mockSocket = new MockSocket();
