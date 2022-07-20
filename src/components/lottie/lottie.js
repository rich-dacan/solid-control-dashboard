import { useLottie } from "lottie-react";
import animationFig from "./animationFig.json"
const Example = () => {
    const options = {
      animationData: animationFig,
      loop: true,
      autoplay: true,
    }
    const { View } = useLottie(options);

    return View;
  };

  export default Example