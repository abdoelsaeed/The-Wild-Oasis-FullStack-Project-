import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { mutate: createBooking, isLoading } = useMutation({
    mutationFn: createBookingApi,
    onSuccess: () => {
      toast.success("New Booking successfully created");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => {
      const errorMessage = err.message || "";

      if (errorMessage.includes("cabinId")) {
        toast.error("Can't find this cabin ID");
      } else if (errorMessage.includes("guestId")) {
        toast.error("Can't find this guest ID");
      } else {
        toast.error("Failed to create booking. Please try again.");
      }
    },
  });
  return { createBooking, isLoading };
}
