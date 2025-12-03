import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateBooking } from "./useCreateBooking";

function CreateBooking() {
  const { createBooking, isLoading } = useCreateBooking();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "unconfirmed",
      hasBreakfast: false,
      isPaid: false,
    },
  });
  function onSubmit(data) {
    createBooking(data);
  }
  function onError(errors) {
    
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type="regular">
      <FormRow label="Start date" error={errors?.startDate?.message}>
        <Input
          disabled={isLoading}
          id="startDate"
          type="date"
          {...register("startDate", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="End date" error={errors?.endDate?.message}>
        <Input
          disabled={isLoading}
          id="endDate"
          type="date"
          {...register("endDate", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Num nights" error={errors?.numNights?.message}>
        <Input
          disabled={isLoading}
          id="numNights"
          type="text"
          {...register("numNights", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Number guests" error={errors?.numGuests?.message}>
        <Input
          disabled={isLoading}
          id="numGuests"
          type="number"
          {...register("numGuests", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin price" error={errors?.cabinPrice?.message}>
        <Input
          disabled={isLoading}
          id="cabinPrice"
          type="number"
          {...register("cabinPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Extras price" error={errors?.extraPrice?.message}>
        <Input
          disabled={isLoading}
          id="extraPrice"
          type="number"
          {...register("extraPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Total price" error={errors?.totalPrice?.message}>
        <Input
          disabled={isLoading}
          id="totalPrice"
          type="number"
          {...register("totalPrice", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Status" error={errors?.status?.message}>
        <select
          {...register("status")}
          style={{
            borderRadius: "var(--border-radius-sm)",
            backgroundColor: "var(--color-grey-0)",
            fontWeight: 500,
            boxShadow: "var(--shadow-sm)",
            fontSize: "1.4rem",
            padding: "0.8rem 1.2rem",
            border: "1px solid var(--color-grey-300)",
          }}
          id="status"
          disabled={isLoading}
        >
          <option value="checked-out">Checked out</option>
          <option value="checked-in">Checked in</option>
          <option value="unconfirmed">Unconfirmed</option>
        </select>
      </FormRow>
      <FormRow label=" Breakfast" error={errors?.hasBreakfast?.message}>
        <select
          {...register("hasBreakfast")}
          style={{
            borderRadius: "var(--border-radius-sm)",
            backgroundColor: "var(--color-grey-0)",
            fontWeight: 500,
            boxShadow: "var(--shadow-sm)",
            fontSize: "1.4rem",
            padding: "0.8rem 1.2rem",
            border: "1px solid var(--color-grey-300)",
          }}
          id="hasBreakfast"
          disabled={isLoading}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </FormRow>
      <FormRow label="Paid" error={errors?.isPaid?.message}>
        <select
          {...register("isPaid")}
          style={{
            borderRadius: "var(--border-radius-sm)",
            backgroundColor: "var(--color-grey-0)",
            fontWeight: 500,
            boxShadow: "var(--shadow-sm)",
            fontSize: "1.4rem",
            padding: "0.8rem 1.2rem",
            border: "1px solid var(--color-grey-300)",
          }}
          id="isPaid"
          disabled={isLoading}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      </FormRow>
      <FormRow label="observations" error={errors?.observations?.message}>
        <Input
          id="observations"
          type="text"
          {...register("observations")}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Cabin ID" error={errors?.cabinId?.message}>
        <Input
          id="cabinId"
          type="number"
          {...register("cabinId", { required: "This field is required" })}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow label="Guest ID" error={errors?.guestId?.message}>
        <Input
          id="guestId"
          type="number"
          {...register("guestId", { required: "This field is required" })}
          disabled={isLoading}
        />
      </FormRow>
      <FormRow>
        <Button variation="secondary" type="reset" disabled={isLoading}>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new booking</Button>
      </FormRow>
    </Form>
  );
}

export default CreateBooking;
