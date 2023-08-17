import { FieldHookConfig, useField, ErrorMessage } from "formik";
import { TextFieldProps } from "./textField.props";

const TextField = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta, helpers] = useField(props);

  return (
    <div className="inline-block w-full">
      <label
        className={`inline-block w-full ${
          meta.touched && meta.error && "border-red-500 border-2 rounded"
        }`}
      >
        <input
          type="text"
          placeholder="Email"
          className="input"
          {...props}
          {...field}
        />
      </label>
      <p className="text-red-500">
        <ErrorMessage name={field.name} />
      </p>
    </div>
  );
};

export default TextField;
