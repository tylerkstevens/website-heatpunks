export interface Video {
  id: string;
  title: string;
  description?: string;
  youtubeId: string;
}

// 2025 Summit videos
export const summitVideos: Video[] = [
  {
    id: 'featured-2025',
    title: 'Heatpunk Summit 2025 Recap',
    description: 'Full recap from Heatpunk Summit 2025 in Denver',
    youtubeId: 'c-NrYzmPRv8',
  },
  {
    id: 'panel-01',
    title: 'Panel 1',
    youtubeId: 'UgL4H89O73c',
  },
  {
    id: 'panel-02',
    title: 'Panel 2',
    youtubeId: 'tR0tAfxsuSs',
  },
  {
    id: 'panel-03',
    title: 'Panel 3',
    youtubeId: 'f3e96xtfFg4',
  },
  {
    id: 'panel-04',
    title: 'Panel 4',
    youtubeId: 'aeEIgNOcPB0',
  },
  {
    id: 'panel-05',
    title: 'Panel 5',
    youtubeId: '91Db7ckw3XQ',
  },
  {
    id: 'panel-06',
    title: 'Panel 6',
    youtubeId: '5TwnzMPvjP0',
  },
  {
    id: 'panel-07',
    title: 'Panel 7',
    youtubeId: 'G3zLz-8cB_I',
  },
  {
    id: 'panel-08',
    title: 'Panel 8',
    youtubeId: 'otYQgWMFlJ8',
  },
  {
    id: 'panel-09',
    title: 'Panel 9',
    youtubeId: '1SLPMWANvoU',
  },
  {
    id: 'panel-10',
    title: 'Panel 10',
    youtubeId: '5kMTeJmEe7Q',
  },
  {
    id: 'panel-11',
    title: 'Panel 11',
    youtubeId: 'jocM1WBbbTA',
  },
  {
    id: 'panel-12',
    title: 'Panel 12',
    youtubeId: 'T5soho5GL2w',
  },
  {
    id: 'panel-13',
    title: 'Panel 13',
    youtubeId: 'E6FjPhL5xWo',
  },
  {
    id: 'panel-14',
    title: 'Panel 14',
    youtubeId: 'xarEPPMGdxU',
  },
];

// Featured video for education page
export const featuredEducationVideo: Video = summitVideos[0];
