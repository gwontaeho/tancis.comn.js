import "react-datepicker/dist/react-datepicker.css";
import "./FormControl.css";

import { forwardRef, memo, useEffect, useRef, useState, FC } from "react";
import { Controller } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
import classNames from "classnames";
import uuid from "react-uuid";
import dayjs from "dayjs";
import { Button, Icon } from "@/components";

const SIZES = {
  1: "w-1/12",
  2: "w-2/12",
  3: "w-3/12",
  4: "w-4/12",
  5: "w-5/12",
  6: "w-6/12",
  7: "w-7/12",
  8: "w-8/12",
  9: "w-9/12",
  10: "w-10/12",
  11: "w-11/12",
  12: "w-full",
  fit: "w-fit",
  full: "w-full",
};

/**
 * @typedef {object} formControlProps
 * @property {('text'|'number'|'password'|'select'|'radio'|'checkbox'|'textarea'|'date'|'time'|'datetime'|'file'|'between')} type
 * @property {keyof SIZES} size
 * @property {object} leftText
 * @property {object} leftButton
 * @property {object} rightText
 * @property {object} rightButton
 * @property {array} options
 */

/**
 * @type FC<formControlProps>
 */
const FormControl = forwardRef((props, ref) => {
  const {
    type,
    invalid,
    getValues,
    edit,
    button,
    leftText,
    leftButton,
    rightText,
    rightButton,
    size = "full",
    ...inputProps
  } = props;

  const isEditFalse = edit === false;
  const hasLeftButton = Boolean(leftButton && !isEditFalse && type !== "between");
  const hasRightButton = Boolean(rightButton && !isEditFalse && type !== "between");
  const hasLeftText = Boolean(leftText);
  const hasRightText = Boolean(rightText);

  const controlRef = useRef();
  const textRef = useRef();
  const leftTextRef = useRef();

  const ignoreLeftText = ["date", "time", "datetime", "between"];

  useEffect(() => {
    if (type === "between" || !getValues) return;

    const controlElement = controlRef.current;
    const textElement = textRef.current;

    if (isEditFalse) {
      controlElement.classList.add("hidden");
      const value = getValues(props.name);
      if (value) textElement.innerHTML = value;
    } else controlElement.classList.remove("hidden");
  }, [isEditFalse]);

  useEffect(() => {
    if (ignoreLeftText.includes(type)) return;

    const input = controlRef.current.getElementsByClassName("input")[0];
    if (!input) return;

    if (hasLeftText) {
      const leftTextWidth = leftTextRef.current.offsetWidth;
      input.style.paddingLeft = `${leftTextWidth}px`;
    } else input.removeAttribute("style");
  }, [type, hasLeftText]);

  let control;
  switch (type) {
    case "text":
      control = <InputText ref={ref} {...inputProps} />;
      break;
    case "number":
      control = <InputNumber ref={ref} {...inputProps} />;
      break;
    case "password":
      control = <InputPassword ref={ref} {...inputProps} />;
      break;
    case "select":
      control = <Select ref={ref} {...inputProps} />;
      break;
    case "radio":
      control = <Radio ref={ref} {...inputProps} />;
      break;
    case "checkbox":
      control = <Checkbox ref={ref} {...inputProps} />;
      break;
    case "textarea":
      control = <Textarea ref={ref} {...inputProps} />;
      break;
    case "date":
      control = <InputDate ref={ref} {...inputProps} />;
      break;
    case "time":
      control = <InputTime ref={ref} {...inputProps} />;
      break;
    case "datetime":
      control = <InputDateTime ref={ref} {...inputProps} />;
      break;
    case "file":
      control = <InputFile ref={ref} {...inputProps} />;
      break;
    case "between":
      control = (
        <InputBetween
          ref={ref}
          edit={edit}
          hasRightButton={hasRightButton}
          hasLeftButton={hasLeftButton}
          {...inputProps}
        />
      );
      break;
    default:
      control = <InputText ref={ref} {...inputProps} />;
      break;
  }

  return (
    <div className={classNames("space-y-1", SIZES[size])}>
      {type !== "between" && isEditFalse && (
        <div className="space-x-1">
          {hasLeftText && <span>{leftText}</span>}
          <span ref={textRef} className="break-all" />
          {hasRightText && <span>{rightText}</span>}
        </div>
      )}
      <div
        ref={controlRef}
        className={classNames("flex w-full", {
          "[&_.input]:rounded-r-none": hasRightButton,
          "[&_.input]:rounded-l-none": hasLeftButton,
        })}>
        {hasLeftButton && (
          <button type="button" className="button border-r-0 rounded-r-none" onClick={leftButton.onClick}>
            {leftButton.icon && <Icon icon={leftButton.icon} size="xs" />}
            {leftButton.text && <span>{leftButton.text}</span>}
          </button>
        )}
        <div className={classNames("w-full relative flex items-center")}>
          {hasLeftText && !ignoreLeftText.includes(type) && (
            <span ref={leftTextRef} className="absolute left-0 px-1 z-10">
              {leftText}
            </span>
          )}
          {control}
          {hasRightText && type !== "between" && <span className="absolute right-0 px-1">{rightText}</span>}
        </div>

        {hasRightButton && (
          <button type="button" className="button border-l-0 rounded-l-none" onClick={rightButton.onClick}>
            {rightButton.icon && <Icon icon={rightButton.icon} size="xs" />}
            {rightButton.text && <span>{rightButton.text}</span>}
          </button>
        )}
      </div>
      {!isEditFalse && invalid && <div className="text-invalid text-sm">invalid field</div>}
    </div>
  );
});

const InputText = forwardRef((props, ref) => {
  const { invalid, ...rest } = props;
  return <input {...rest} ref={ref} type="text" className="input" />;
});

const InputNumber = forwardRef((props, ref) => {
  const { invalid, ...rest } = props;
  return <input {...rest} ref={ref} type="number" className="input" />;
});

const InputPassword = forwardRef((props, ref) => {
  const { invalid, ...rest } = props;
  return <input {...rest} ref={ref} type="password" autoComplete="off" className="input" />;
});

const Textarea = forwardRef((props, ref) => {
  const { invalid, ...rest } = props;
  return <textarea {...rest} ref={ref} className="input block h-14 overflow-hidden" />;
});

const Select = forwardRef((props, ref) => {
  const { invalid, options, ...rest } = props;
  return (
    <div className="relative flex w-full items-center">
      <select {...rest} ref={ref} className="input appearance-none pr-5">
        <Select.Options options={options} />
      </select>
      <Icon icon="down" size="xs" className="absolute right-1 pointer-events-none" />
    </div>
  );
});

Select.Options = memo(({ options }) => {
  return (
    Array.isArray(options) &&
    options.map(({ label, value }) => {
      return (
        <option key={uuid()} value={value}>
          {label}
        </option>
      );
    })
  );
});

const Checkbox = forwardRef((props, ref) => {
  const { id, invalid, options, ...rest } = props;
  return (
    <div id={id} className="flex flex-wrap">
      {Array.isArray(options) &&
        options.map(({ label, value }) => {
          return (
            <div key={uuid()} className="flex items-center h-7 space-x-1 mr-3">
              <input ref={ref} {...rest} type="checkbox" value={value} />
              {label && <label>{label}</label>}
            </div>
          );
        })}
    </div>
  );
});

const Radio = forwardRef((props, ref) => {
  const { id, invalid, options, ...rest } = props;
  return (
    <div id={id} className="flex flex-wrap">
      {Array.isArray(options) &&
        options.map(({ label, value }) => {
          return (
            <div key={uuid()} className="flex items-center h-7 space-x-1 mr-3">
              <input ref={ref} {...rest} type="radio" value={value} />
              {label && <label>{label}</label>}
            </div>
          );
        })}
    </div>
  );
});

const InputDate = forwardRef((props, ref) => {
  const { name, invalid, control, rules, ...rest } = props;
  const [selected, setSelected] = useState();

  return (
    <div className="relative w-full [&>div]:w-full">
      <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            const _value = new Date(value);

            return (
              <ReactDatePicker
                {...rest}
                selected={isNaN(_value) ? undefined : _value}
                onChange={onChange}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      ) : (
        <ReactDatePicker
          {...rest}
          selected={selected}
          onChange={setSelected}
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
        />
      )}
    </div>
  );
});

const InputTime = forwardRef((props, ref) => {
  const { name, invalid, control, rules, ...rest } = props;
  const [selected, setSelected] = useState();
  const dateFormat = "HH:mm";

  return (
    <div className="w-full [&>div]:w-full">
      <Icon icon="clock" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            const _value = new Date(value);
            return (
              <ReactDatePicker
                {...rest}
                dateFormat={dateFormat}
                timeIntervals={5}
                showTimeSelect
                showTimeSelectOnly
                selected={isNaN(_value) ? undefined : _value}
                onChange={onChange}
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      ) : (
        <ReactDatePicker
          {...rest}
          selected={selected}
          onChange={setSelected}
          dateFormat={dateFormat}
          timeIntervals={5}
          showTimeSelect
          showTimeSelectOnly
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
        />
      )}
    </div>
  );
});

const InputDateTime = forwardRef((props, ref) => {
  const { edit, name, invalid, control, rules, ...rest } = props;
  const [selected, setSelected] = useState();

  return (
    <div className="relative w-full [&>div]:w-full">
      <Icon icon="calendar" size="xs" className="absolute left-1 top-1/2 -translate-y-1/2 z-10" />
      {control ? (
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => {
            const _value = new Date(value);
            return (
              <ReactDatePicker
                {...rest}
                timeIntervals={5}
                showTimeSelect
                selected={isNaN(_value) ? undefined : _value}
                onChange={onChange}
                dateFormat="MM/dd/yyyy HH:mm"
                className="input pl-5"
                popperProps={{ strategy: "fixed" }}
              />
            );
          }}
        />
      ) : (
        <ReactDatePicker
          {...rest}
          selected={selected}
          onChange={setSelected}
          timeIntervals={5}
          showTimeSelect
          dateFormat="MM/dd/yyyy HH:mm"
          className="input pl-5"
          popperProps={{ strategy: "fixed" }}
        />
      )}
    </div>
  );
});

const InputBetween = forwardRef((props, ref) => {
  const { edit, schema, options, setValue } = props;
  const [begin, end] = Object.entries(schema);

  const isEditFalse = edit === false;

  const handleClickButton = (unit, value) => {
    if (!setValue) return;
    const isAdd = value > 0;
    const today = new Date();
    if (isAdd) {
      setValue(begin[0], today);
      setValue(end[0], dayjs(today).add(value, unit).toDate());
    } else {
      setValue(begin[0], dayjs(today).add(value, unit).toDate());
      setValue(end[0], today);
    }
  };

  const Begin = () => {
    const schema = begin[1];
    return (
      <div className={classNames("[&_.input]:rounded-r-none [&_.button]:rounded-r-none", { "flex-1": !isEditFalse })}>
        <FormControl {...schema} edit={edit} />
      </div>
    );
  };

  const End = () => {
    const schema = end[1];
    return (
      <div
        className={classNames("[&_.input]:rounded-l-none [&_.button]:rounded-l-none", {
          "flex-1": !isEditFalse,
          "[&_.input]:rounded-r-none [&_.button]:rounded-r-none": options,
        })}>
        <FormControl {...schema} edit={edit} />
      </div>
    );
  };

  return (
    <div className={classNames("w-full flex items-start")}>
      <Begin />
      <div
        className={classNames("flex items-center justify-center h-7 w-5", {
          "bg-header border-y": !isEditFalse,
        })}>
        -
      </div>
      <End />

      {!isEditFalse && options && (
        <div className="flex [&>button]:bg-header [&>button]:text-sm [&>button]:border-l-0 [&>button]:rounded-none last:[&>button]:rounded-r">
          {InputBetweenOptions[options].map(({ label, unit, value }) => {
            return (
              <Button key={uuid()} onClick={() => handleClickButton(unit, value)}>
                {label}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
});

const InputBetweenOptions = {
  date1: [
    { label: "-3M", unit: "M", value: -3 },
    { label: "-1M", unit: "M", value: -1 },
    { label: "-1W", unit: "w", value: -1 },
    { label: "0", unit: "d", value: 1 },
    { label: "+1W", unit: "w", value: 1 },
    { label: "+1M", unit: "M", value: 1 },
    { label: "+3M", unit: "M", value: 3 },
  ],
  date2: [
    { label: "+1D", unit: "d", value: 1 },
    { label: "+1W", unit: "w", value: 1 },
    { label: "+1M", unit: "M", value: 1 },
    { label: "+2M", unit: "M", value: 2 },
    { label: "+3M", unit: "M", value: 3 },
    { label: "+6M", unit: "M", value: 6 },
    { label: "+12M", unit: "M", value: 12 },
  ],
  date3: [
    { label: "-1M", unit: "M", value: -1 },
    { label: "-1W", unit: "w", value: -1 },
    { label: "Today", unit: "d", value: 1 },
    { label: "+1W", unit: "w", value: 1 },
  ],
  time1: [
    { label: "-3H", unit: "h", value: -3 },
    { label: "-2H", unit: "h", value: -2 },
    { label: "-1H", unit: "h", value: -1 },
    { label: "+1H", unit: "h", value: 1 },
    { label: "+2H", unit: "h", value: 2 },
    { label: "+3H", unit: "h", value: 3 },
  ],
};

const InputFile = forwardRef((props, ref) => {
  const { invalid, ...rest } = props;

  return (
    <input
      {...rest}
      ref={ref}
      type="file"
      className="file h-7 border rounded w-full file:h-full file:outline-none file:bg-header file:border-none file:text-text cursor-pointer"
    />
  );
});

const FormControlGroup = ({ children }) => {
  return (
    <div
      className={classNames(
        "overflow-hidden flex border divide-x rounded [&_.input]:border-none [&_.input]:rounded-none [&_.button]:border-none [&_.button]:rounded-none"
      )}>
      {children}
    </div>
  );
};

const Compound = Object.assign({}, FormControl, { Group: FormControlGroup });

export { Compound as FormControl };
