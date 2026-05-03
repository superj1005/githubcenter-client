import { apiService } from "@/api/apiService";
import { useToast } from "@/components/costum/Toast/ToastContext";
import { useQueryParam } from "@/hooks/useQueryParam";
import { getLocalStorageItem } from "@/utils/storage";
import { useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { RiGitRepositoryLine } from "react-icons/ri";
import { HiOutlineCollection } from "react-icons/hi";
import { useNavigate } from 'react-router-dom'
import { BsDot } from "react-icons/bs";
import { useUser } from "@clerk/clerk-react";

const RemoveGhDialogBox = ({ghData}:any) => {
  const { addToast } = useToast();
  const username = useQueryParam("username");
  const userId = getLocalStorageItem("userId");

  const navigate = useNavigate();
  const { user } = useUser();

  const unId = user?.id; // fallback if no username

  const [removeText, setRemoveText] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRemoveText(e.target.value);
  };

  const handleResetClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const reqData = {
      userId,
      ghUsername: username,
    };

    // console.log(reqData);

    try {
      const post_data = await apiService.removeGhAccount(reqData);
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

      navigate(`/${unId}/dashboard`);
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

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg border">
      <form className="space-y-4">
        <div>
          <div className="flex flex-col">
            <div className="flex flex-col w-full border items-center justify-center gap-2 rounded-lg p-4 bg-gray-50">
            
                <IoLogoGithub className="h-12 w-12"/>
              

              <div className="flex w-full items-center justify-center gap-2">
                <span>
                  <img className="w-6 h-6 rounded-full border-3 " src={ghData?.avatarUrl}/>
                </span>
                <span>
                  {ghData?.username}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1">
                  <RiGitRepositoryLine className="text-cgray-ntext"/>
                  <span className="text-cgray-dtext">12</span>
                </span>
                <span className="flex items-center gap-1">
                  <HiOutlineCollection className="text-cgray-ntext"/>
                  <span className="text-cgray-dtext">04</span>
                </span>
              </div>

            </div>

            <div className="flex flex-col p-2 mb-3 mt-4">
              <div className="font-semibold text-red-600 mb-1">This will permanently delete -</div>
              <div className="flex flex-col ml-1 text-sm text-red-700">
                <span className="flex items-center">
                  <BsDot />
                  All your Selected Repositories.
                </span>
                <span className="flex items-center">
                <BsDot />
                  All your Groups.
                </span>
                <span className="flex items-center">
                <BsDot />
                  Your PAT(Personal Access Token).
                </span>

                <span className="flex items-center">
                <BsDot />
                  Your Github Account From the Github-Center.
                </span>
              </div>
            </div>
          </div>
          <div className="border mb-4"/>
          <label
            htmlFor="remove-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Type <strong>"Remove"</strong> to confirm
          </label>
          <input
            id="remove-input"
            type="text"
            value={removeText}
            onChange={handleOnChange}
            placeholder='Type "Remove"'
            className="text-sm w-full border focus:border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:shadow-sm border-cgray-border"
          />
        </div>

        <button
          className={`${
            removeText === "Remove" ? "red-button" : "red-button-disabled"
          }`}
          onClick={handleResetClick}
          disabled={removeText !== "Remove"}
        >
          Remove
        </button>
      </form>
    </div>
  );
};

export default RemoveGhDialogBox;
