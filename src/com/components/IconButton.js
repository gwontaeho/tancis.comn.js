import { Icon } from "@/com/components/Icon";
import { iconProps } from ".";

/**
 * @typedef {object} _iconButtonProps
 * @property {funtion} onClick
 * @typedef {_iconButtonProps & iconProps } iconButtonProps
 */

/**
 * @param {iconButtonProps} props
 */
export const IconButton = (props) => {
  const { icon, size, onClick } = props;
  return (
    <button onClick={onClick} className="rounded-full p-1 transition hover:bg-black/5 dark:hover:bg-white/5">
      <Icon icon={icon} size={size} />
    </button>
  );
};
