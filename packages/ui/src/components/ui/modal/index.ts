// index.ts
// Public API

import Modal from "./modal";
import { ModalTrigger } from "./trigger";
import { ModalOverlay } from "./overlay";
import { ModalContent } from "./content";
import { ModalHeader } from "./header";
import { ModalBody } from "./body";
import { ModalFooter } from "./footer";
import { ModalTitle } from "./title";
import { ModalDescription } from "./description";
import { ModalClose } from "./close";

export type {
  ModalSize,
  ModalContextType,
  ModalProps,
  ModalTriggerProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalCloseProps,
} from "./types";

// Compound component pattern
Modal.Trigger = ModalTrigger;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Close = ModalClose;

export {
  ModalTrigger,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
  ModalDescription,
  ModalClose,
};
export { Modal as default };
export { Modal };
