import { Loading, Modal, PressEvent, Spacer, Text  } from '@nextui-org/react';
import { FC} from 'react';

interface ModalProps{
    open?:boolean;
    onOpenChanged:(e: PressEvent) => void;
}

export const Spinner:FC<ModalProps> = ({open,onOpenChanged}) => {
    return (
        <Modal
            
            blur
            aria-labelledby="modal-title"
            open={open}
            css={{background:'transparent',shadow:'none'}}
          >
            {/* <Modal.Header>
              <Text id="modal-title" size={18} color="success">
                Succes
              </Text>
            </Modal.Header> */}
            {/* <Modal.Body> */}
              {/* <Text h3 css={{textAlign:'center'}}>New Item Added</Text> */}
              
            {/* </Modal.Body> */}
            {/* <Loading type="spinner" size="xl" textColor='warning' /> */}
            <Spacer />
            <Loading size="xl" color="secondary" textColor="secondary">Loading</Loading>
            <Spacer />
            {/* <Text h1>Loading</Text> */}
            {/* <Modal.Footer>
              <Button auto flat color="error" onPress={onOpenChanged}>
                Close
              </Button>
            </Modal.Footer> */}
          </Modal>
      )
}
