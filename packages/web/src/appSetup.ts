import { addYupExtensions } from "@yardage-tracker/shared/src/schemas/yupExtensions";
import "destyle.css";
import "./styles/globalStyles.scss";

const appSetup = () => {
  addYupExtensions();
};

appSetup();
