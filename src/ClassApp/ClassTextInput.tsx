import { ComponentProps, Component } from "react";

type ClassTextInputProps = {
  labelFor: string;
  labelText: string;
  inputProps: ComponentProps<"input">;
};

export class ClassTextInput extends Component<ClassTextInputProps> {
  render() {
    const { labelFor, labelText, inputProps } = this.props;
    return (
      <div className="input-wrap">
        <label htmlFor={labelFor}>{labelText}:</label>
        <input type="text" {...inputProps} />
      </div>
    );
  }
}
