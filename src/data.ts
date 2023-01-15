export const days: string[] = [
  'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'
];

export type Time = `${number}:${number}`;

type BlockTime = {
  blockId: number,
  modules: number[],
  startTime: Time,
  endTime: Time,
};

export const blockTimes: BlockTime[] = [
  { 
    blockId: 1,
    modules: [1, 2],
    startTime: '8:15',
    endTime: '9:35'
  },
  { 
    blockId: 2,
    modules: [3, 4],
    startTime: '9:50',
    endTime: '11:10'
  },
  { 
    blockId: 3,
    modules: [5, 6],
    startTime: '11:25',
    endTime: '12:45'
  },
  { 
    blockId: 4,
    modules: [7, 8],
    startTime: '13:45',
    endTime: '15:05'
  },
  { 
    blockId: 5,
    modules: [9, 10],
    startTime: '15:20',
    endTime: '16:40'
  },
  { 
    blockId: 6,
    modules: [11, 12],
    startTime: '5:05',
    endTime: '18:15'
  },
  { 
    blockId: 7,
    modules: [13, 14],
    startTime: '18:45',
    endTime: '20:05'
  },
  { 
    blockId: 8,
    modules: [15, 16],
    startTime: '20:05',
    endTime: '21:25'
  },
  { 
    blockId: 9,
    modules: [17, 18],
    startTime: '21:25',
    endTime: '22:45'
  }
];

export const colors: string[] = [
  '#F786AA', '#11B5E4', '#399E5A', '#8B635C', '#A2A3BB',
  '##7D8CC4', '#FC7753', '#DBD56E', '#CA2E55', '#61E8E1',
 ];