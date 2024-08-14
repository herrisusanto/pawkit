import { Text } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { XStack, YStack } from "tamagui";
import { RadioButton } from "@/components/common/RadioButton/RadioButton";
import { fetchQuestionAnswer } from "@/api/pet";
import { QuestionAnswer, QuestionProps } from "./QuestionAnswer";
import { useFormContext } from "react-hook-form";
import { fetchQuestion } from "@/api/service-booking";
import { Question } from "@/api/graphql/API";

export const QuestionYesNo: FC<QuestionProps> = ({
  question,
  control,
  name,
}) => {
  const form = useFormContext();
  const [petId, questionId] = name.split("_");
  const [defaultValue, setDefaultValue] = useState<string>("false");
  const [followUpQuestion, setFollowUpQuestion] = useState<Question | null>(
    null
  );

  const watchAnswer = form.watch(name);
  // eslint-disable-next-line
  const getDefaultAnswer = async () => {
    const result = await fetchQuestionAnswer(petId, questionId);
    if (result) {
      setDefaultValue(result?.answer);
      form.setValue(name, defaultValue);
    }
  };

  const getFollowUpQuestion = async (id: string) => {
    const followedUpQuestionRequest = await fetchQuestion(id);
    if (followedUpQuestionRequest) {
      setFollowUpQuestion(followedUpQuestionRequest);
    }
  };

  useEffect(() => {
    getDefaultAnswer();
    // eslint-disable-next-line
  }, [name]);

  useEffect(() => {
    if (
      watchAnswer === "true" &&
      question.followUpQuestionIds &&
      question.followUpQuestionIds?.length > 0
    ) {
      getFollowUpQuestion(question.followUpQuestionIds[0]);
    } else {
      setFollowUpQuestion(null);
    }
    // eslint-disable-next-line
  }, [watchAnswer]);

  return (
    <YStack rowGap="$3">
      <YStack rowGap="$1.5">
        <Text>{`${question.questionString}${question.isRequired ? "*" : ""}`}</Text>
        <XStack columnGap="$4">
          <RadioButton
            flex={1}
            control={control}
            name={name}
            value="true"
            jc="center"
            defaultValue={defaultValue}
            rules={{
              required: question.isRequired,
            }}
          >
            Yes
          </RadioButton>
          <RadioButton
            flex={1}
            control={control}
            name={name}
            value="false"
            jc="center"
            defaultValue={defaultValue}
            rules={{
              required: question.isRequired,
            }}
          >
            No
          </RadioButton>
        </XStack>
      </YStack>
      {followUpQuestion && (
        <QuestionAnswer
          question={followUpQuestion}
          control={control}
          name={`${petId}_${followUpQuestion.id}`}
        />
      )}
    </YStack>
  );
};
