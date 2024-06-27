import { PetType } from "@/api/graphql/API";
import { images } from "@/constants";

export const petDefaultAvatar = (petType?: PetType) => {
  switch (petType) {
    case "CAT":
      return images.catDefaultAvatar;
    default:
      return images.dogDefaultAvatar;
  }
};
