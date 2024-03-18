import { Dialog } from "@headlessui/react";
import { useEffect, useState } from "react";

export const BaseModal = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50 bg-red-500"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>Title</Dialog.Title>

          <Dialog.Description>Description</Dialog.Description>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
