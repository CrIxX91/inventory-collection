import { Button, Modal, PressEvent, Text } from '@nextui-org/react';
import { FC, SetStateAction, useState } from 'react';

interface ModalProps{
    open?:boolean;
    onOpenChanged:(e: PressEvent) => void;
}

export const ModalSuccess:FC<ModalProps> = ({open,onOpenChanged}) => {

  return (
    <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={open}
      >
        <Modal.Header>
          <Text id="modal-title" size={18} color="success">
            Succes
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text h3 css={{textAlign:'center'}}>New Item Added</Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={onOpenChanged}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
