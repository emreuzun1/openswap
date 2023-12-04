import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const AreYouSureModal = ({
  message,
  onClose,
  isOpen,
  onApprove,
  onParentClose,
}) => {
  return (
    <Modal size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Are You Sure?
            </ModalHeader>
            <ModalBody>
              <p>{message}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                No
              </Button>
              <Button
                color="primary"
                onPress={() => {
                  onApprove();
                  onClose();
                  onParentClose();
                }}
              >
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AreYouSureModal;
