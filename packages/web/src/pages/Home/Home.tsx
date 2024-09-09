import { FormikSubmit } from "../../utils/FormikUtils";
import styles from "./Home.module.scss";
import { Field, Form, Formik } from "formik";

type Conditions = {
  temperature: number;
  humidity: number;
  altitude: number;
  tailwindMph: number;
};

type Yardage = Conditions & {
  club: string;
  distance: number;
};

function getAdjustedYardage(stock: Yardage, conditions: Conditions): number {
  const { distance } = stock;

  // 2 yards longer for every 10 degrees warmer
  const temperatureAdjustment =
    ((conditions.temperature - stock.temperature) / 10) * 2;
  // 2% more distance for every 1,000 feet of altitude increase
  const altitudeAdjustment =
    ((conditions.altitude - stock.altitude) / 1000) * (distance * 0.02);
  // For every 10mph increase in tailwind, add 2% to the distance
  const tailwindAdjustment =
    ((conditions.tailwindMph - stock.tailwindMph) / 10) * (distance * 0.02);

  return (
    distance + temperatureAdjustment + altitudeAdjustment + tailwindAdjustment
  );
}

const tempStockYardage: Yardage = {
  club: "7i",
  distance: 150,
  temperature: 70,
  humidity: 50,
  altitude: 0,
  tailwindMph: 0,
};

const tempNewConditions: Conditions = {
  temperature: 70,
  humidity: 50,
  altitude: 0,
  tailwindMph: 10,
};

namespace Home {
  export type Props = {};
}

type Values = {
  stockTemperature: number;
  stockHumidity: number;
  stockAltitude: number;
  stockTailwindMph: number;
  distance: number;
  newTemperature: number;
  newHumidity: number;
  newAltitude: number;
  newTailwindMph: number;
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
            stockTailwindMph: 0,
            newTemperature: 70,
          } as Values
        }
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form className={styles.form}>
            <h2>Stock Yardage</h2>
            <Field
              name="distance"
              type="number"
              className={styles.field}
              placeholder="Distance"
            />
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
            <Field
              name="stockAltitude"
              type="number"
              className={styles.field}
              placeholder="Altitude"
            />
            <Field
              name="stockTailwindMph"
              type="number"
              className={styles.field}
              placeholder="Tailwind MPH"
            />

            <br />

            <h2>Current Conditions</h2>
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
            <Field
              name="newAltitude"
              type="number"
              className={styles.field}
              placeholder="Altitude"
            />
            <Field
              name="newTailwindMph"
              type="number"
              className={styles.field}
              placeholder="Tailwind MPH"
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
                  tailwindMph: values.stockTailwindMph ?? 0,
                  temperature: values.stockTemperature ?? 0,
                },
                {
                  altitude: values.newAltitude ?? 0,
                  humidity: values.newHumidity ?? 0,
                  tailwindMph: values.newTailwindMph ?? 0,
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
