import { useState } from "react";
import { useForm as _useForm } from "react-hook-form";

// required
// min
// max
// minLength
// maxLength
// pattern
// validate

/**
 * @param {Object} props
 * @param {Object} props.defaultSchema
 * @param {Object} props.values
 */
export const useForm = (props) => {
  const {
    register,
    getValues,
    control,
    setValue,
    setFocus,
    handleSubmit,
    trigger,
    getFieldState,
    reset,
    clearErrors,
    watch,
    formState: { errors, isSubmitted },
  } = _useForm({ values: props.values });
  const { defaultSchema } = props || {};
  const { __form__, ..._defaultSchema } = defaultSchema || {};
  const [_schema, _setSchema] = useState(_defaultSchema);

  // update schema
  const setSchema = (key, value) => {
    _setSchema((prev) => ({ ...prev, [key]: { ...prev[key], ...value } }));
  };

  // reset schema
  const resetSchema = (key, value) => {
    _setSchema(_defaultSchema);
    reset();
  };

  // update schema edit false|true
  const setEditable = (key, value) => {
    if (value === undefined) {
      return _setSchema((prev) =>
        Object.fromEntries(
          Object.entries(prev).map((_) => {
            return [_[0], { ..._[1], edit: !!key }];
          })
        )
      );
    }
    _setSchema((prev) => ({ ...prev, [key]: { ...prev[key], edit: value } }));
  };

  // validate
  const validate = (key) => {
    if (key in _schema) trigger(key, { shouldFocus: true });
    else trigger();
  };

  const clearValues = () => {
    reset();
  };

  const setValues = (values) => {
    reset(values);
  };

  // make schema object
  const getSchema = (entries) => {
    return entries.reduce((prev, curr) => {
      const [name, origin] = curr;

      const getCommon = (name, origin) => {
        const { type, pattern, validate, minLength, maxLength, required, ...rest } = origin;
        const id = __form__ + "." + name;
        const common = { id, type, getValues, ...rest };
        const invalid = errors[name];
        if (invalid) common.invalid = invalid;
        return common;
      };

      const getInputProps = (origin) => {
        const inputProps = {};
        const { maxLength, required } = origin;
        if (maxLength) inputProps.maxLength = maxLength;
        if (required) inputProps.required = required;
        return inputProps;
      };

      const getRules = (origin) => {
        const rules = {};
        const { pattern, validate, minLength, maxLength, required } = origin;

        if (maxLength) rules.maxLength = maxLength;
        if (required) rules.required = required;
        if (minLength) rules.minLength = minLength;
        if (pattern) rules.pattern = pattern;
        if (validate) rules.validate = validate;

        rules.onChange = () => {
          if (getFieldState(name).invalid) trigger(name);
        };
        return rules;
      };

      const getRegister = (name, origin) => {
        return register(name, { ...getRules(origin) });
      };

      const getControl = (name, origin) => {
        return { name, control, rules: getRules(origin) };
      };

      let obj;
      switch (origin.type) {
        case "date":
        case "time":
        case "datetime":
          obj = Object.assign(getCommon(name, origin), getControl(name, origin), getInputProps(origin));
          break;
        case "between":
          obj = Object.assign(getCommon(name, origin), { schema: getSchema(Object.entries(origin.schema)), setValue });
          break;
        default:
          obj = Object.assign(getCommon(name, origin), getRegister(name, origin), getInputProps(origin));
      }
      return { ...prev, [name]: obj };
    }, {});
  };

  const schema = getSchema(Object.entries(_schema));

  return {
    schema,
    setSchema,
    resetSchema,
    setEditable,
    getValues,
    setValue,
    setFocus,
    control,
    register,
    handleSubmit,
    validate,
    errors,
    clearValues,
    clearErrors,
    watch,
    isSubmitted,
    setValues,
  };
};
