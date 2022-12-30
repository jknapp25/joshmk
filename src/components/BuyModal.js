import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";

import { ConfigContext } from "../App";

export default BuyModal;

function BuyModal({ showModal, setShowModal }) {
  const config = useContext(ConfigContext);

  const displayCreatorName = config.nickName || "the creator";
  const displayContactEmail = config.emailAddress
    ? ` at ${config.emailAddress}`
    : "";

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Body>
        To purchase this item you can contact {displayCreatorName} directly
        {displayContactEmail}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
