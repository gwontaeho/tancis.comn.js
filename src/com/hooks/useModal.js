import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";
import { modalState } from "@/com/recoil";

export const useModal = () => {
  const setModal = useSetRecoilState(modalState);

  /**
   * @param {object} props
   * @param {('sm'|'md'|'lg')} props.size
   * @param {string} props.message
   * @param {boolean} props.backdrop
   * @param {function} props.onConfirm
   * @param {function} props.onCancel
   * @param {any} props.render
   */
  const openModal = (props) => {
    setModal((prev) => [...prev, { ...props, id: uuid(), isOpen: true }]);
  };

  const closeModal = () => {
    setModal([]);
  };

  return { openModal, closeModal };
};
