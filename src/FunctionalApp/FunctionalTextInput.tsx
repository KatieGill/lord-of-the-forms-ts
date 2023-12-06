import { ComponentProps } from "react";

export function FunctionalTextInput({
  labelFor,
  labelText,
  inputProps,
}: {
  labelFor: string;
  labelText: string;
  inputProps: ComponentProps<"input">;
}) {
  return (
    <div className="input-wrap">
      <label htmlFor={labelFor}>{labelText}:</label>
      <input type="text" {...inputProps} />
    </div>
  );
}
