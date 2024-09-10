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
  per: number;

  constructor(params: { factor: number; isPercentage: boolean; per: number }) {
    this.factor = params.factor;
    this.per = params.per;
    this.isPercentage = params.isPercentage;
  }

  getAdjustment(change: number, distance: number): number {
    change = change / this.per;

    return this.isPercentage
      ? change * (this.factor * distance)
      : change * this.factor;
  }
}

export class WeatherAdjustments {
  private static altitudeFactor = new SimpleAdjustmentFactor({
    factor: 0.02, // 2% adjustment per 1,000 feet
    per: 1000,
    isPercentage: true,
  });
  private static temperatureFactor = new SimpleAdjustmentFactor({
    factor: 2, // 2 yards per 10 degrees
    per: 10,
    isPercentage: false,
  });

  private static getAdjustment(
    distance: number,
    stockWeather: WeatherConditions,
    currentWeather: WeatherConditions
  ): number {
    const temperatureAdjustment = this.temperatureFactor.getAdjustment(
      currentWeather.temperature - stockWeather.temperature,
      distance
    );
    const altitudeAdjustment = this.altitudeFactor.getAdjustment(
      currentWeather.altitude - stockWeather.altitude,
      distance
    );

    const windAdjustment = WindAdjustments.getAdjustment(
      distance,
      stockWeather.wind,
      currentWeather.wind
    );

    console.log({
      current: currentWeather.temperature,
      stock: stockWeather.temperature,
      adjustment: temperatureAdjustment,
    });

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
