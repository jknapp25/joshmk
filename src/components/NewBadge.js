import moment from "moment";
import { Badge } from "react-bootstrap";

export default NewBadge;

function NewBadge({ createdAt }) {
  const isToday = moment(createdAt).isSame(new Date(), "day");

  if (!isToday) return;
  return (
    <Badge bg="success" pill className="me-2">
      New
    </Badge>
  );
}
