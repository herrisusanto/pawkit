import { View } from "react-native";
import React, { FC } from "react";
import { Control, FieldValues } from "react-hook-form";
import { Question } from "@/api/graphql/API";
import { QuestionYesNo } from "./QuestionYesNo";
import { QuestionText } from "./QuestionText";
import { QuestionDate } from "./QuestionDate";

export type QuestionProps = {
  question: Question;
  control: Control<FieldValues, any>;
  name: string;
};

export const QuestionAnswer: FC<QuestionProps> = ({
  question,
  control,
  name,
}) => {
  const renderQuestion = () => {
    switch (question.questionType) {
      case "YES_NO":
        return (
          <QuestionYesNo question={question} control={control} name={name} />
        );
      case "TEXT":
        return (
          <QuestionText question={question} control={control} name={name} />
        );
      case "DATE":
        return (
          <QuestionDate question={question} control={control} name={name} />
        );
    }
  };
  return <View>{renderQuestion()}</View>;
};
