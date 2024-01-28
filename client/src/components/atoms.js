import { atom } from 'recoil';

export const gameScoresState = atom({
  key: 'gameScoresState',
  default: {
    gamesWon: 0,
    gamesLost: 0,
  },
});
