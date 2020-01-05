// 与加热器等产品相关的常量

// 管道式加热器 型号到价格的映射表
export const HQS_MATRIX = {
  碳钢: {
    DN40: 510,
    DN65: 540,
    DN125: 1420,
    DN250: 3050,
  },
  '304': {
    DN40: 920,
    DN65: 1960,
    DN125: 4660,
    DN250: 10550,
  },
  '316L': {
    DN40: 1380,
    DN65: 2490,
    DN125: 6990,
    DN250: 15825,
  },
  '外壳碳钢 芯体304': {
    DN40: 640,
    DN65: 730,
    DN125: 2410,
    DN250: 6500,
  },
};

// 加热器 型号到价格的映射表
export const HJ_MATRIX = {
  碳钢: {
    DN25: 260,
    DN32: 260,
    DN40: 260,
    DN50: 280,
    DN65: 280,
    DN80: 460,
    DN100: 460,
    DN125: 620,
    DN150: 850,
  },
  '304': {
    DN25: 460,
    DN32: 460,
    DN40: 460,
    DN50: 700,
    DN65: 700,
    DN80: 900,
    DN100: 900,
    DN125: 1150,
    DN150: 1150,
  },
  '316L': {
    DN25: 560,
    DN32: 560,
    DN40: 560,
    DN50: 830,
    DN65: 830,
    DN80: 1050,
    DN100: 1050,
    DN125: 1400,
    DN150: 1700,
  },
};
