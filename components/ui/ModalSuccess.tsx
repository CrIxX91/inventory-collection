import { Button, Modal, PressEvent, Text } from '@nextui-org/react';
import { FC} from 'react';

interface ModalProps{
    open?:boolean;
    onOpenChanged:(e: PressEvent) => void;
    success:boolean;
    message:string;
}

export const ModalSuccess:FC<ModalProps> = ({open,onOpenChanged,success,message}) => {

  return (
    <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={open}
      >
        <Modal.Header>
          {
            success 
              ? <Text id="modal-title" size={18} color="success">Succes</Text>
              : <Text id="modal-title" size={18} color="error">Error</Text>
          }
        </Modal.Header>
        <Modal.Body>
          {
            success 
              ? <Text h3 css={{textAlign:'center'}}>New Item Added</Text> 
              : <Text h3 css={{textAlign:'center'}}>{message}</Text>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={onOpenChanged}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
