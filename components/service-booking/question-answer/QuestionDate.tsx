import React, { FC, useEffect, useState } from "react";
import { fetchQuestionAnswer } from "@/api/pet";
import { DatePickerSheet } from "@/components/common/DatePickerSheet/DatePickerSheet";
import { QuestionProps } from "./QuestionAnswer";
import moment from "moment";

export const QuestionDate: FC<QuestionProps> = ({
  question,
  control,
  name,
}) => {
  const [petId, questionId] = name.split("_");
  const [defaultValue, setDefaultValue] = useState<string>("");
  // eslint-disable-next-line
  const getDefaultAnswer = async () => {
    const result = await fetchQuestionAnswer(petId, questionId);
    if (result) {
      setDefaultValue(result?.answer);
    }
  };

  useEffect(() => {
    getDefaultAnswer();
    // eslint-disable-next-line
  }, [name]);
  return (
    <DatePickerSheet
      control={control}
      disabledDates="after"
      name={name}
      label={`${question.questionString}${question.isRequired ? "*" : ""}`}
      defaultDate={moment(defaultValue)}
      rules={{
        required: question.isRequired,
      }}
    />
  );
};
