import { WindAdjustments, WindConditions } from "./WindAdjustments";

export type Yardage = WeatherConditions & {
  club: string;
  distance: number;
};

export type WeatherConditions = {
  temperature: number;
  humidity: number;
  altitude: number;
  wind: WindConditions;
};

class SimpleAdjustmentFactor {
  factor: number;
  isPercentage: boolean;

  constructor(params: { factor: number; isPercentage: boolean }) {
    this.factor = params.factor;
    this.isPercentage = params.isPercentage;
  }

  getAdjustment(change: number): number {
    return this.isPercentage ? change * this.factor : this.factor;
  }
}

export class WeatherAdjustments {
  private static altitudeFactor = new SimpleAdjustmentFactor({
    factor: 0.02, // 2% adjustment per 1,000 feet
    isPercentage: true,
  });
  private static temperatureFactor = new SimpleAdjustmentFactor({
    factor: 2, // 2 yards per 10 degrees
    isPercentage: false,
  });

  private static getAdjustment(
    distance: number,
    stockWeather: WeatherConditions,
    currentWeather: WeatherConditions
  ): number {
    const temperatureAdjustment = this.temperatureFactor.getAdjustment(
      currentWeather.temperature - stockWeather.temperature
    );
    const altitudeAdjustment = this.altitudeFactor.getAdjustment(
      currentWeather.altitude - stockWeather.altitude
    );

    const windAdjustment = WindAdjustments.getAdjustment(
      distance,
      stockWeather.wind,
      currentWeather.wind
    );

    return temperatureAdjustment + altitudeAdjustment + windAdjustment;
  }

  static getAdjustedYardage(
    stock: Yardage,
    conditions: WeatherConditions
  ): number {
    return (
      stock.distance + this.getAdjustment(stock.distance, stock, conditions)
    );
  }
}
