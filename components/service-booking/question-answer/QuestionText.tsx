import React, { FC, useEffect, useState } from "react";
import { fetchQuestionAnswer } from "@/api/pet";
import { TextArea } from "@/components/common/TextArea/TextArea";
import { QuestionProps } from "./QuestionAnswer";
import { useFormContext } from "react-hook-form";

export const QuestionText: FC<QuestionProps> = ({
  question,
  control,
  name,
}) => {
  const form = useFormContext();
  const [petId, questionId] = name.split("_");
  const [defaultValue, setDefaultValue] = useState<string>("");
  // eslint-disable-next-line
  const getDefaultAnswer = async () => {
    const result = await fetchQuestionAnswer(petId, questionId);
    if (result) {
      setDefaultValue(result?.answer);
      form.setValue(name, defaultValue);
    }
  };

  useEffect(() => {
    getDefaultAnswer();
    // eslint-disable-next-line
  }, [name]);

  return (
    <TextArea
      textAlignVertical="top"
      control={control}
      name={name}
      label={`${question.questionString}${question.isRequired ? "*" : ""}`}
      labelProps={{ maxWidth: 327 }}
      defaultValue={defaultValue}
      rules={{
        required: question.isRequired,
      }}
    />
  );
};
