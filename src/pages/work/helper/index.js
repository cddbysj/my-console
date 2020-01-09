// 喉部水流速度参考值 单位 m/s
const VELOCITY = 9.1229;
// 蒸汽热焓值参考值 单位 KCal/kg
const STEAM_ENTHALPY = 656.93;
// QSH-48 对应的斜孔数量
const STANDARD_HOLES_COUNT = 720;
// QSH-48 对应的蒸汽流量 单位 kg/h
const STANDARD_STEAM_FLOW = 16724.99;

// 千焦到千卡的转换系数
const KJ_TO_KCAL = 4.184;

// 计算水管的直径
export const computeWaterDiameter = (flow, waterVelocity) =>
  Math.ceil(2 * Math.sqrt(((flow / 3600 / waterVelocity) * 1000000) / Math.PI));

// 计算水需要吸收的热量
export const computeCalorie = (flow, heatTo, heatFrom) =>
  flow * 1000 * (heatTo - heatFrom);

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

// 计算蒸汽耗量
export const computeSteamCount = (calorie, steamEnthalpy, heatTo) =>
  Math.ceil(calorie / (steamEnthalpy / KJ_TO_KCAL - heatTo));

// 计算蒸汽管道直径
export const computeSteamDiameter = (
  steamCount, // 蒸汽耗量
  steamSpecificHeatCapacity, // 蒸汽比热容
  steamVelocity // 蒸汽经济流速 25 - 40 m/s 之间
) => {
  return Math.round(
    2 *
      Math.sqrt(
        (1000000 *
          ((steamCount * steamSpecificHeatCapacity) / 3600 / steamVelocity)) /
          Math.PI
      )
  );
};
