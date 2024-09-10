export type WindConditions = {
  speed: number;
  direction: number;
};

export class WindAdjustments {
  private static windFactorPer10mph = 0.02;

  private static calculateWindEffect(wind: WindConditions): number {
    const windFactorPer10mph = this.windFactorPer10mph;
    const angleRadians = (wind.direction * Math.PI) / 180;

    // Calculate the longitudinal wind component (cosine of the angle)
    const longitudinalWindComponent = wind.speed * Math.cos(angleRadians);

    // Calculate the percentage adjustment based on wind speed
    const windAdjustment =
      (longitudinalWindComponent / 10) * windFactorPer10mph;

    return windAdjustment;
  }

  static getAdjustment(
    distance: number,
    stockWind: WindConditions,
    currentWind: WindConditions
  ): number {
    const stockWindAdjustment = this.calculateWindEffect(stockWind);
    const currentWindAdjustment = this.calculateWindEffect(currentWind);

    const totalWindAdjustment = currentWindAdjustment - stockWindAdjustment;

    const adjustedYardage = distance * totalWindAdjustment;

    return adjustedYardage;
  }
}
