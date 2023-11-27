import classNames from "classnames";

const gaps = {
  1: {
    col: "space-y-1",
    row: "space-x-1",
  },
  2: {
    col: "space-y-2",
    row: "space-x-2",
  },
  4: {
    col: "space-y-4",
    row: "space-x-4",
  },
  8: {
    col: "space-y-8",
    row: "space-x-8",
  },
  8: {
    col: "space-y-8",
    row: "space-x-8",
  },
  16: {
    col: "space-y-16",
    row: "space-x-16",
  },
};

/**
 * @typedef {object} LayoutProps
 * @property {('col'|'row')} direction
 * @property {keyof gaps} gap
 */

/**
 * @param {LayoutProps} props
 */
export const Layout = (props) => {
  const { children, direction = "col", gap = 4 } = props;
  const isRow = direction === "row";

  return (
    <div
      className={classNames("flex", gaps[gap][direction], {
        "flex-col": !isRow,
        "space-x-4": isRow,
      })}>
      {children}
    </div>
  );
};

const LayoutLeft = ({ children }) => {
  return <div className="w-full max-w-fit flex space-x-1">{children}</div>;
};

const LayoutRight = ({ children }) => {
  return <div className="w-full flex justify-end space-x-1">{children}</div>;
};

Layout.Left = LayoutLeft;
Layout.Right = LayoutRight;
