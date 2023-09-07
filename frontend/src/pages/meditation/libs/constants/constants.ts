import { type MeditationCreateValidation } from '#packages/meditation/libs/types/types.js';

const DEFAULT_MEDITATION_PAYLOAD: MeditationCreateValidation = {
  title: '',
  file: null,
};

const mockedEntries = [
  {
    id: 1,
    title: 'Meditation for deep sleep',
    duration: '10 min',
  },
  {
    id: 2,
    title: 'Breathing meditation',
    duration: '5 min',
  },
  {
    id: 3,
    title: 'Meditation for relax',
    duration: '15 min',
  },
  {
    id: 4,
    title: 'Nature meditation',
    duration: '45 min',
  },
] as const;

export { DEFAULT_MEDITATION_PAYLOAD, mockedEntries };
