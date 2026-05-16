/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Shell } from './components/layout/Shell';
import { Landing } from './pages/Landing';
import { MatchRoom } from './pages/MatchRoom';
import { GroupRoom } from './pages/GroupRoom';
import { Leaderboard } from './pages/Leaderboard';
import { Highlights } from './pages/Highlights';
import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route path="/" element={<Landing />} />
            <Route path="/match/:matchId" element={<MatchRoom />} />
            <Route path="/match" element={<MatchRoom />} />
            <Route path="/group" element={<GroupRoom />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/highlights" element={<Highlights />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
