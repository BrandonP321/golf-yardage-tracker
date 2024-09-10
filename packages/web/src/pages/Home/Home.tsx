import { FormikSubmit } from "../../utils/FormikUtils";
import styles from "./Home.module.scss";
import { Field, Form, Formik } from "formik";
import { WeatherAdjustments } from "@yardage-tracker/shared/src/utils/WeatherAdjustments";

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
              {WeatherAdjustments.getAdjustedYardage(
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
