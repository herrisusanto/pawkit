import { PetType } from "@/api/graphql/API";
import { images } from "@/constants";

export const petDefaultAvatar = (petType?: PetType) => {
  switch (petType) {
    case "CAT":
      return images.catDefaultAvatar;
    case "DOG":
      return images.dogDefaultAvatar;
    case "RABBIT":
      return images.rabbitDefaultAvatar;
    case "HAMSTER":
      return images.hamsterDefaultAvatar;
    case "GUINEA_PIG":
      return images.guineaPigDefaultAvatar;
    default:
      return images.dogDefaultAvatar;
  }
};
