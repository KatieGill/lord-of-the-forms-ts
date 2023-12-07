import { ChangeEventHandler, useRef } from "react";
import { PhoneNumber } from "../types";

export function FunctionalPhoneInput({
  phoneInput,
  setPhoneInput,
}: {
  phoneInput: PhoneNumber;
  setPhoneInput: (phoneInput: PhoneNumber) => void;
}) {
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const ref0 = refs[0];
  const ref1 = refs[1];
  const ref2 = refs[2];
  const ref3 = refs[3];

  const createOnChangeHandlerPhoneInput =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const value = e.target.value.replace(/[^\d]/, "");
      const nextRef = refs[index + 1];
      const previousRef = refs[index - 1];
      const shouldGoToNextRef =
        currentMaxLength === value.length && nextRef?.current;
      const shouldGoToPreviousRef = value.length === 0 && previousRef?.current;

      const newPhoneInput = phoneInput.map((input, inputIndex) => {
        return index === inputIndex ? value : input;
      }) as unknown as PhoneNumber;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }
      if (shouldGoToPreviousRef) {
        previousRef.current?.focus();
      }
      setPhoneInput(newPhoneInput);
    };

  return (
    <div className="input-wrap">
      <label htmlFor="phone">Phone:</label>
      <div id="phone-input-wrap">
        <input
          type="text"
          id="phone-input-1"
          placeholder="55"
          maxLength={2}
          value={phoneInput[0]}
          ref={ref0}
          onChange={createOnChangeHandlerPhoneInput(0)}
        />
        -
        <input
          type="text"
          id="phone-input-2"
          placeholder="55"
          maxLength={2}
          value={phoneInput[1]}
          ref={ref1}
          onChange={createOnChangeHandlerPhoneInput(1)}
        />
        -
        <input
          type="text"
          id="phone-input-3"
          placeholder="55"
          maxLength={2}
          value={phoneInput[2]}
          ref={ref2}
          onChange={createOnChangeHandlerPhoneInput(2)}
        />
        -
        <input
          type="text"
          id="phone-input-4"
          placeholder="5"
          maxLength={1}
          value={phoneInput[3]}
          ref={ref3}
          onChange={createOnChangeHandlerPhoneInput(3)}
        />
      </div>
    </div>
  );
}
