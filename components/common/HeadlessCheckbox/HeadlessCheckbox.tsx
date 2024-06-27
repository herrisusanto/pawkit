import type { CheckboxProps as CheckboxHeadlessProps } from "@tamagui/checkbox-headless";

import { useCheckbox } from "@tamagui/checkbox-headless";

import { Check } from "@tamagui/lucide-icons";

import { forwardRef, useEffect, useState } from "react";

import type { View } from "react-native";

import { Pressable } from "react-native";
import { getToken } from "tamagui";

const HeadlessCheckbox = forwardRef<View, CheckboxHeadlessProps>(
  (props, ref) => {
    const [checked, setChecked] = useState(props.defaultChecked || false);

    useEffect(() => {
      if (props?.onCheckedChange) {
        props?.onCheckedChange(checked);
      }
    }, [checked, props]);

    const { checkboxProps, checkboxRef, bubbleInput } = useCheckbox(
      props,
      [checked, setChecked],
      ref
    );
    return (
      <Pressable
        style={{
          width: 20,
          height: 20,
          borderRadius: 4,
          justifyContent: "center",
          alignItems: "center",
          borderColor: getToken("$natural0"),
          borderWidth: checked === true ? 0 : getToken("$0.5"),
          backgroundColor:
            checked === true ? getToken("$color.primary") : getToken("$bgGrey"),
        }}
        ref={checkboxRef}
        {...checkboxProps}
      >
        {checked === true && <Check color="$background" size="$1" />}

        {bubbleInput}
      </Pressable>
    );
  }
);

export default HeadlessCheckbox;
