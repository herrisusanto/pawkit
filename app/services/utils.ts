import { Service } from "@/api/graphql/API";

type GroupedAddOns = {
  title?: string | null;
  data: Service[];
};

export const groupAddOnByChildServiceGroup = (addOns: Service[]) => {
  if (!addOns || addOns.length === 0) {
    return [];
  }
  return addOns.reduce((accumulator: GroupedAddOns[], item: Service) => {
    const titlePosition = accumulator.findIndex(
      (i) => i.title === item.childServiceGroup
    );
    if (titlePosition > -1) {
      accumulator[titlePosition].data.push(item);
    } else {
      accumulator.push({
        title: item.childServiceGroup,
        data: [item],
      });
    }
    return accumulator;
  }, []);
};

export const hasSelectServiceGroup = (
  selectedAddOnId: string,
  savedAddOnIds: string[],
  addOns: Service[]
) => {
  const selectedServiceGroup = addOns.find(
    (addOn) => addOn.id === selectedAddOnId
  )?.childServiceGroup;

  const savedServiceGroups = savedAddOnIds
    .map((id) => {
      const serviceGroup = addOns.find(
        (addOn) => addOn.id === id
      )?.childServiceGroup;
      return serviceGroup;
    })
    .filter((group) => group != null);

  const index = savedServiceGroups.findIndex(
    (group) => group === selectedServiceGroup
  );

  return index !== -1;
};
