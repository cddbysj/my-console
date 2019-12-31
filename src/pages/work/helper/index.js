// 喉部水流速度参考值 单位 m/s
const VELOCITY = 9.1229;
// 蒸汽热焓值参考值 单位 KCal/kg
const STEAM_ENTHALPY = 656.93;
// QSH-48 对应的斜孔数量
const STANDARD_HOLES_COUNT = 720;
// QSH-48 对应的蒸汽流量 单位 kg/h
const STANDARD_STEAM_FLOW = 16724.99;

// 计算喉部直径
export const computeThroatDiameter = flow =>
  Math.ceil(2 * Math.sqrt((1000000 * flow) / 3600 / VELOCITY / Math.PI));

// 计算斜孔数量
export const computeHolesCount = (flow, heatFrom, heatTo) => {
  const heatIn = flow * 1000 * (heatTo - heatFrom); // 吸收热量
  const result =
    (STANDARD_HOLES_COUNT * heatIn) /
    (STEAM_ENTHALPY - heatTo) /
    STANDARD_STEAM_FLOW;

  return Math.ceil(result);
};
