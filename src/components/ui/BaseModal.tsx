import { BaseButton } from "./BaseButton";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmAction: () => void;
  confirmText?: string;
  cancelText?: string;
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  description,
  confirmAction,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: BaseModalProps): JSX.Element => {
  const handleConfirmAction = async () => {
    await confirmAction();
    onClose();
  };

  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
      as={Fragment}
    >
      <Dialog onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-8 text-center min-w-1/3">
            
            <Dialog.Title className="text-xl font-bold">{title}</Dialog.Title>
            
            <Dialog.Description className="py-6">
              {description}
            </Dialog.Description>

            <div className="w-full flex justify-around mx-auto">
              <BaseButton variant="secondary" onClick={() => onClose()}>
                {cancelText}
              </BaseButton>
              <BaseButton
                variant="primary"
                onClick={() => handleConfirmAction()}
              >
                {confirmText}
              </BaseButton>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};
