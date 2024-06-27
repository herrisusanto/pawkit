import { Text, View, styled } from "tamagui";

const BookingStatusChip = ({ status }: { status: string }) => {
  const Chip = styled(View, {
    borderRadius: "$10",
    paddingHorizontal: "$3",
    paddingVertical: "$1",
  });

  let bgChipColor = "$green3";
  let textChipColor = "$green";

  switch (status) {
    case "Confirmed": {
      bgChipColor = "$green3";
      textChipColor = "$green";
      break;
    }
    case "Pending": {
      bgChipColor = "$yellow3";
      textChipColor = "$yellow11";
      break;
    }
    case "Completed": {
      bgChipColor = "$blue3";
      textChipColor = "$blue";
      break;
    }
    default: {
      bgChipColor = "$green3";
      textChipColor = "$green";
    }
  }

  return (
    <Chip bg={bgChipColor}>
      <Text fontWeight="$5" color={textChipColor}>
        {status}
      </Text>
    </Chip>
  );
};

export default BookingStatusChip;
