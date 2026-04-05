// index.ts
// Public API

import Modal from './Modal';
import { ModalTrigger } from './ModalTrigger';
import { ModalOverlay } from './ModalOverlay';
import { ModalContent } from './ModalContent';
import { ModalHeader } from './ModalHeader';
import { ModalBody } from './ModalBody';
import { ModalFooter } from './ModalFooter';
import { ModalTitle } from './ModalTitle';
import { ModalDescription } from './ModalDescription';
import { ModalClose } from './ModalClose';

export type {
  ModalSize,
  ModalContextType,
  ModalProps,
  ModalTriggerProps,
  ModalOverlayProps,
  ModalContentProps,
  ModalCloseProps,
} from './types';

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
