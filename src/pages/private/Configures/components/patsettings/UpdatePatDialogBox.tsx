// import { apiService } from "@/api/apiService";
import { Form, type FormField } from "@/components/costum/Form";
// import { useToast } from "@/components/costum/Toast/ToastContext";
import { useQueryParam } from "@/hooks/useQueryParam";
import { getLocalStorageItem } from "@/utils/storage";
// import { useUser } from "@clerk/clerk-react";
// import { RiGitRepositoryLine } from "react-icons/ri";
import { z } from "zod";

// 1. Define validation schema
const userSchema = z.object({
  pat: z.string().min(2, "Name must be at least 2 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

// 2. Define form fields

// 3. Define form component
const UpdatePatDialogBox = ({
  patName,
  setReqPatData,
  setIsPatUpdateConfOpen,
}: any) => {
  // const { addToast } = useToast();
  const username = useQueryParam("username");

  const userId = getLocalStorageItem("userId");

  const userFormFields: FormField[] = [
    {
      name: "pat",
      label: "New PAT",
      type: "text",
      placeholder: "dfsdjh3nighjbfa793d09hdfsds334",
      validation: z.string().min(2),
      className: "col-span-2",
    },
  ];

  const handleSubmit = async (data: any) => {
    const reqData = {
      ...data,
      userId,
      patName,
      ghUsername: username,
    };

    // console.log(reqData);
    setReqPatData(reqData);
    setIsPatUpdateConfOpen(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-2 bg-white rounded-lg">
      <Form<UserFormData>
        fields={userFormFields}
        onSubmit={handleSubmit}
        schema={userSchema}
        // defaultValues={initialData}
        formClassName="grid grid-cols-2 gap-4"
        submitButtonClassName="blue-button"
        resetButtonClassName="white-button"
        buttonsContainerClassName="flex space-x-3 justify-end mt-6 col-span-2"
      />
    </div>
  );
};

export default UpdatePatDialogBox;
