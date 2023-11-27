import React, { FC, forwardRef } from "react";
import classNames from "classnames";
import { FormControl } from "@/com/components";
import { formControlProps } from "@/com/components/FormControl";

const SIZES = {
  1: "col-span-1",
  2: "col-span-2",
  3: "col-span-3",
  4: "col-span-4",
  5: "col-span-5",
  6: "col-span-6",
  7: "col-span-7",
  8: "col-span-8",
  9: "col-span-9",
  10: "col-span-10",
  11: "col-span-11",
  12: "col-span-12",
};

export const Group = ({ children, id, className }) => {
  return (
    <div id={id} className={classNames("shadow rounded bg-card p-4 space-y-4 w-full", className)}>
      {children}
    </div>
  );
};

/**
 * @typedef groupHeaderProps
 * @property {('sm'|'md'|'lg')} size
 */

/**
 * @param {groupHeaderProps} props
 */
const GroupHeader = (props) => {
  const { children, size = "md" } = props;
  const sizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };

  return <div className={classNames("w-full font-semibold", sizes[size])}>{children}</div>;
};

const GroupBody = ({ children }) => {
  return <div className="w-full">{children}</div>;
};

const GroupRow = ({ children }) => {
  return (
    <div className="w-full grid grid-cols-1 min-h-[2.5rem] border-x border-b first:border-t sm:grid-cols-12">
      {children}
    </div>
  );
};

/**
 * @typedef {object} _GroupLabelProps
 * @property {boolean} required
 * @property {string} label
 * @property {number} labelSize
 * @typedef {_GroupLabelProps & formControlProps} GroupLabelProps
 */

/**
 * @type FC<GroupLabelProps>
 */
const GroupLabel = forwardRef((props, ref) => {
  const { required, type, label, labelSize = 2, ...rest } = props;
  return (
    <div
      className={classNames(
        "font-semibold relative flex items-center p-1 break-all bg-header sm:border-x first:border-l-0 last:border-r-0 first:last:border-r",
        SIZES[labelSize]
      )}>
      {type ? <FormControl ref={ref} {...rest} /> : label}
      {required && <span className={classNames("text-invalid ml-0.5", { "absolute top-0 right-0.5": type })}>*</span>}
    </div>
  );
});

/**
 * @typedef {object} _GroupControlProps
 * @property {number} controlSize
 * @typedef {_GroupControlProps & GroupLabelProps & formControlProps } GroupControlProps
 */

/**
 * @type FC<GroupControlProps>
 */
const GroupControl = forwardRef((props, ref) => {
  const { required, labelSize, label, controlSize = 4, ...rest } = props;
  return (
    <>
      {label && <GroupLabel label={label} required={required} labelSize={labelSize} />}
      <div className={classNames("p-1 flex items-center", SIZES[controlSize])}>
        <FormControl ref={ref} {...rest} />
      </div>
    </>
  );
});

/**
 * @typedef {object} _GroupColProps
 * @property {number} colSize
 * @typedef {_GroupColProps & GroupLabelProps} GroupColProps
 */

/**
 * @param {GroupColProps} props
 */
const GroupCol = (props) => {
  const { children, label, labelSize, colSize = 4 } = props;
  return (
    <>
      {label && <GroupLabel labelSize={labelSize} label={label} />}
      <div className={classNames("p-1 flex items-center space-x-1", SIZES[colSize])}>{children}</div>
    </>
  );
};

Group.Header = GroupHeader;
Group.Body = GroupBody;
Group.Row = GroupRow;
Group.Col = GroupCol;
Group.Label = GroupLabel;
Group.Control = GroupControl;
