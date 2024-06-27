import React from "react";
import { YStack, Text, Accordion, Separator, Square } from "tamagui";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";

type QuestionAnswerType = {
  question: string;
  answer: string;
};

const questionAnswer = [
  {
    question: "What is express grooming?",
    answer:
      "Treat your pet to a basic dog grooming session with our care team. With grooming done in the comfort of your own home, your pet will feel safe, relaxed, and pampered.\n\nWhat is included in Basic Dog Grooming? \n- Pre grooming consultation \n- General health evaluation \n- Nail clipping & filing \n- Ear cleaning \n- Shaving of paw pads \n- Shaving of sanitary area \n- Bathing and drying \n- Brushing and combing",
  },
  {
    question:
      "Lorem Ipsum Lorem Ipsum Lorem Ipsum   Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum   IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum   Ipsum?",
    answer:
      "Treat your pet to a basic dog grooming session with our care team. With grooming done in the comfort of your own home, your pet will feel safe, relaxed, and pampered.\n\nWhat is included in Basic Dog Grooming? \n- Pre grooming consultation \n- General health evaluation \n- Nail clipping & filing \n- Ear cleaning \n- Shaving of paw pads \n- Shaving of sanitary area \n- Bathing and drying \n- Brushing and combing",
  },
  {
    question: "Lorem Ipsum Lorem Ipsum Lorem?",
    answer:
      "Treat your pet to a basic dog grooming session with our care team. With grooming done in the comfort of your own home, your pet will feel safe, relaxed, and pampered.\n\nWhat is included in Basic Dog Grooming? \n- Pre grooming consultation \n- General health evaluation \n- Nail clipping & filing \n- Ear cleaning \n- Shaving of paw pads \n- Shaving of sanitary area \n- Bathing and drying \n- Brushing and combing",
  },
  {
    question: "How to register our pet?",
    answer:
      "Treat your pet to a basic dog grooming session with our care team. With grooming done in the comfort of your own home, your pet will feel safe, relaxed, and pampered.\n\nWhat is included in Basic Dog Grooming? \n- Pre grooming consultation \n- General health evaluation \n- Nail clipping & filing \n- Ear cleaning \n- Shaving of paw pads \n- Shaving of sanitary area \n- Bathing and drying \n- Brushing and combing",
  },
  {
    question: "Lorem Ipsum Lorem Ipsum Lorem?",
    answer:
      "Treat your pet to a basic dog grooming session with our care team. With grooming done in the comfort of your own home, your pet will feel safe, relaxed, and pampered.\n\nWhat is included in Basic Dog Grooming? \n- Pre grooming consultation \n- General health evaluation \n- Nail clipping & filing \n- Ear cleaning \n- Shaving of paw pads \n- Shaving of sanitary area \n- Bathing and drying \n- Brushing and combing",
  },
  {
    question: "How to register our pet?",
    answer:
      "Treat your pet to a basic dog grooming session with our care team. With grooming done in the comfort of your own home, your pet will feel safe, relaxed, and pampered.\n\nWhat is included in Basic Dog Grooming? \n- Pre grooming consultation \n- General health evaluation \n- Nail clipping & filing \n- Ear cleaning \n- Shaving of paw pads \n- Shaving of sanitary area \n- Bathing and drying \n- Brushing and combing",
  },
];

export const ContentHelpCenter = () => {
  return (
    <YStack rowGap="$4" p="$5" pb="$10" flex={1} bg="white">
      <Text fontSize="$b2" fontWeight="$7">
        Welcome to Pawkit help center!
      </Text>
      <Text fontSize="$c2">
        Lorem ipsum lorem ipsum dolor sil amet lorem ipsum dolor sil amet lorem
        ipsum dolor sil amet lorem ipsum dolor sil amet lorem ipsum dolor sil
        amet lorem ipsum dolor sil amet
      </Text>
      <Text fontSize="$b2" fontWeight="$7">
        FAQ
      </Text>
      <Accordion overflow="hidden" type="multiple">
        {questionAnswer.map((item, index) => (
          <React.Fragment key={index}>
            <QuestionAnswer
              key={index}
              question={item.question}
              answer={item.answer}
            />
            {index !== questionAnswer.length - 1 && (
              <Separator borderColor="$natural0" mt="$3" />
            )}
          </React.Fragment>
        ))}
      </Accordion>
    </YStack>
  );
};

const QuestionAnswer: React.FC<QuestionAnswerType> = ({ question, answer }) => (
  <Accordion.Item value={question}>
    <Accordion.Trigger
      w="$full"
      p="$0"
      paddingVertical="$2"
      borderWidth="$0"
      marginVertical="$2"
    >
      {({ open }: { open: boolean }) => (
        <Square flex={1} flexDirection="row" justifyContent="space-between">
          <Text fontSize="$c1" fontWeight="$7" flex={0.99}>
            {question}
          </Text>
          {open ? <ChevronUp size="$1" /> : <ChevronDown size="$1" />}
        </Square>
      )}
    </Accordion.Trigger>
    <Accordion.Content animation="quickest" exitStyle={{ opacity: 0 }} p="$0">
      <Text fontSize="$c2">{answer}</Text>
    </Accordion.Content>
  </Accordion.Item>
);
