import { FormikSubmit } from "../../utils/FormikUtils";
import styles from "./Home.module.scss";
import { Field, Form, Formik } from "formik";

type WindConditions = {
  speed: number;
  direction: number;
};

type Conditions = {
  temperature: number;
  humidity: number;
  altitude: number;
  wind: WindConditions;
};

type Yardage = Conditions & {
  club: string;
  distance: number;
};

function getWindAdjustment(
  distance: number,
  stockWind: WindConditions,
  currentWind: WindConditions
): number {
  // Helper function to calculate the wind adjustment based on wind speed and direction
  function calculateWindEffect(wind: WindConditions): number {
    // Assuming a basic factor where every 10 mph wind affects yardage by about 2% in either direction.
    const windFactorPer10mph = 0.02; // 2% adjustment per 10 mph
    const angleRadians = (wind.direction * Math.PI) / 180; // Convert angle to radians

    // Calculate the longitudinal wind component (cosine of the angle)
    const longitudinalWindComponent = wind.speed * Math.cos(angleRadians);

    // Calculate the percentage adjustment based on wind speed
    const windAdjustment =
      (longitudinalWindComponent / 10) * windFactorPer10mph;

    return windAdjustment;
  }

  const stockWindAdjustment = calculateWindEffect(stockWind);
  const currentWindAdjustment = calculateWindEffect(currentWind);

  const totalWindAdjustment = currentWindAdjustment - stockWindAdjustment;

  const adjustedYardage = distance * totalWindAdjustment;

  return adjustedYardage;
}

function getAdjustedYardage(stock: Yardage, conditions: Conditions): number {
  const { distance } = stock;

  // 2 yards longer for every 10 degrees warmer
  const temperatureAdjustment =
    ((conditions.temperature - stock.temperature) / 10) * 2;
  // 2% more distance for every 1,000 feet of altitude increase
  const altitudeAdjustment =
    ((conditions.altitude - stock.altitude) / 1000) * (distance * 0.02);

  const windAdjustment = getWindAdjustment(
    distance,
    stock.wind,
    conditions.wind
  );

  return distance + temperatureAdjustment + altitudeAdjustment + windAdjustment;
}

namespace Home {
  export type Props = {};
}

type Values = {
  stockTemperature: number;
  stockHumidity: number;
  stockAltitude: number;
  stockWindDirection: number;
  stockWindSpeed: number;
  distance: number;
  newTemperature: number;
  newHumidity: number;
  newAltitude: number;
  newWindDirection: number;
  newWindSpeed: number;
};

function Home(props: Home.Props) {
  const handleSubmit: FormikSubmit<Values> = async (v) => {};

  return (
    <div>
      <Formik
        initialValues={
          {
            distance: 150,
            stockTemperature: 70,
            stockAltitude: 0,
            stockHumidity: 0,
            stockWindDirection: 0,
            stockWindSpeed: 0,
            newTemperature: 70,
          } as Values
        }
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <h2>Stock Yardage</h2>
            <br />
            <p>Distance</p>
            <Field
              name="distance"
              type="number"
              className={styles.field}
              placeholder="Distance"
            />
            <p>Temperature</p>
            <Field
              name="stockTemperature"
              type="number"
              className={styles.field}
              placeholder="Temperature"
            />
            {/* <Field
              name="stockHumidity"
              type="number"
              className={styles.field}
              placeholder="Humidity"
            /> */}
            <p>Altitude</p>
            <Field
              name="stockAltitude"
              type="number"
              className={styles.field}
              placeholder="Altitude"
            />
            <p>Wind Speed</p>
            <Field
              name="stockWindSpeed"
              type="number"
              className={styles.field}
              placeholder="Tailwind MPH"
            />
            <p>Wind Direction</p>
            <Field
              name="stockWindDirection"
              type="number"
              className={styles.field}
              placeholder="Wind Direction"
            />

            <br />

            <h2>Current Conditions</h2>
            <br />

            <p>Temperature</p>
            <Field
              name="newTemperature"
              type="number"
              className={styles.field}
              placeholder="Temperature"
            />
            {/* <Field
              name="newHumidity"
              type="number"
              className={styles.field}
              placeholder="Humidity"
            /> */}
            <p>Altitude</p>
            <Field
              name="newAltitude"
              type="number"
              className={styles.field}
              placeholder="Altitude"
            />
            <p>Wind Speed</p>
            <Field
              name="newWindSpeed"
              type="number"
              className={styles.field}
              placeholder="Tailwind MPH"
            />
            <p>Wind Direction</p>
            <Field
              name="newWindDirection"
              type="number"
              className={styles.field}
              placeholder="Wind Direction"
            />

            <br />
            <br />

            <p>
              New distance:{" "}
              {getAdjustedYardage(
                {
                  altitude: values.stockAltitude ?? 0,
                  club: "7i",
                  distance: values.distance ?? 0,
                  humidity: values.stockHumidity ?? 0,
                  wind: {
                    direction: values.stockWindDirection ?? 0,
                    speed: values.stockWindSpeed ?? 0,
                  },
                  temperature: values.stockTemperature ?? 0,
                },
                {
                  altitude: values.newAltitude ?? 0,
                  humidity: values.newHumidity ?? 0,
                  wind: {
                    direction: values.newWindDirection ?? 0,
                    speed: values.newWindSpeed ?? 0,
                  },
                  temperature: values.newTemperature ?? 0,
                }
              )}
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Home;
