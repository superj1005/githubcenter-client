import { apiService } from "@/api/apiService";
import { Form, type FormField } from "@/components/costum/Form";
import { useToast } from "@/components/costum/Toast/ToastContext";
import { useQueryParam } from "@/hooks/useQueryParam";
import { getLocalStorageItem } from "@/utils/storage";
import { z } from "zod";

// 1. Define validation schema
const userSchema = z.object({
  newGroupName: z.string().min(2, "Name must be at least 2 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

// 2. Define form fields

// 3. Define form component
const RenameGroupDialogBox = ({groupId, groupName}:{groupId:string | undefined, groupName: string}) => {
  const { addToast } = useToast();
  const username = useQueryParam("username");

  const userId = getLocalStorageItem("userId");


  const userFormFields: FormField[] = [
    {
      name: "newGroupName",
      label: "New Group Name",
      type: "text",
      placeholder: "Write...",
      validation: z.string().min(2),
      className: "col-span-2",
    },
  ];

  const handleSubmit = async (data: any) => {
    const reqData = {
      ...data,
      userId,
      groupId,
      ghUsername:username,
    };

    // console.log(reqData);

    try {
      const post_data = await apiService.updateGroup(reqData);
      if (post_data.status === false) {
        addToast({
          message: post_data.message || "Something went wrong",
          type: "error",
          duration: 4000,
          closeButton: true,
          position: "top-center",
        });
        return;
      }
      addToast({
        message: "Group renamed successfully",
        type: "success",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
      window.location.reload();
    } catch (error) {
      console.error("Unexpected error:", error);
      addToast({
        message: "Unexpected error occurred",
        type: "error",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });
    }
  };
  const initialData = {
    newGroupName: groupName,
  }

  return (
    <div className="max-w-2xl mx-auto p-2 bg-white rounded-lg">
      <Form<UserFormData>
        fields={userFormFields}
        onSubmit={handleSubmit}
        schema={userSchema}
        defaultValues={initialData}
        formClassName="grid grid-cols-2 gap-4"
        submitButtonClassName="blue-button"
        resetButtonClassName="white-button"
        buttonsContainerClassName="flex space-x-3 justify-end mt-6 col-span-2"
      />
    </div>
  );
};

export default RenameGroupDialogBox;
