import security1 from "../Icons/heading1.jpg";
import security2 from "../Icons/background2.jpg";
import security3 from "../Icons/security3.jpg";

export const setImages = (initialData) => {
  initialData.forEach((item) => {
    switch (parseInt(item.image)) {
      case 1:
        item.imageSrc = security1;
        break;
      case 2:
        item.imageSrc = security2;
        break;
      case 3:
        item.imageSrc = security3;
        break;
    }
  });
  console.log("checking image", initialData);
  return initialData;
};
