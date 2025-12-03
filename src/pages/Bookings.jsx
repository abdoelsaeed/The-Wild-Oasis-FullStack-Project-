import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";
import BookingTableOperations from "../features/bookings/BookingTableOperations";
import Button from "../ui/Button";
import { useState } from "react";
import CreateBooking from "../features/bookings/CreateBooking";
import { IoClose } from "react-icons/io5";

function Bookings() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingTableOperations />
        <Button onClick={() => setShowForm((show) => !show)}>
          {showForm ? <IoClose /> : "Add booking"}
        </Button>
      </Row>

      {showForm ? <CreateBooking /> : <BookingTable />}
    </>
  );
}

export default Bookings;
