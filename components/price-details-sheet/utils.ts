import { CustomPrice, Pet, Service } from "@/api/graphql/API";

const getAdditionalPriceLabel = (key: string): string => {
  switch (key) {
    case "xsWeightPrice":
      return `Extra Small Size`;
    case "sWeightPrice":
      return `Small Size`;
    case "mWeightPrice":
      return `Medium Size`;
    case "lWeightPrice":
      return `Large Size`;
    case "xlWeightPrice":
      return `Extra Large Size`;
    case "xxlWeightPrice":
      return `Double Extra Large Size`;
    default:
      return "Size is not available";
  }
};

export const getAdditionalPrice = (weight: number, service: Service) => {
  const keys: (keyof Service)[] = [
    "xsWeightPrice",
    "sWeightPrice",
    "mWeightPrice",
    "lWeightPrice",
    "xlWeightPrice",
    "xxlWeightPrice",
  ];
  let additionalPrice = 0;
  if (service) {
    keys.forEach((key) => {
      const customPrice = service[key] as CustomPrice;
      if (
        service &&
        customPrice &&
        customPrice.minWeight &&
        customPrice.maxWeight
      ) {
        if (weight > customPrice.minWeight && weight <= customPrice.maxWeight) {
          additionalPrice = customPrice.amount;
        }
      }
    });
  }
  return additionalPrice;
};

export type ServiceCustomPrice = {
  name: string;
  petName: string;
  serviceName: string;
  amount: number;
};

export const getCustomPrice = (
  pet: Pet,
  service: Service
): ServiceCustomPrice | undefined => {
  const keys: (keyof Service)[] = [
    "xsWeightPrice",
    "sWeightPrice",
    "mWeightPrice",
    "lWeightPrice",
    "xlWeightPrice",
    "xxlWeightPrice",
  ];
  let serviceCustomPrice;
  if (service && pet) {
    const weight = pet?.weightValue ?? 0;
    keys.forEach((key) => {
      const customPrice = service[key] as CustomPrice;
      if (
        service &&
        customPrice &&
        customPrice.minWeight &&
        customPrice.maxWeight
      ) {
        if (weight > customPrice.minWeight && weight <= customPrice.maxWeight) {
          serviceCustomPrice = {
            name: `${getAdditionalPriceLabel(key)} (${customPrice.minWeight}-${customPrice.maxWeight})Kg`,
            petName: pet.name,
            serviceName: service.name,
            amount: customPrice.amount,
          };
        }
      }
    });
  }
  return serviceCustomPrice;
};
