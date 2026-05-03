import { useEffect, useState } from "react";
import RepositorySelector, { type Repository } from "./RepositorySelector";
import { apiService } from "@/api/apiService";
import { getLocalStorageItem } from "@/utils/storage";
import { useUser } from "@clerk/clerk-react";
import { useQueryParam } from "@/hooks/useQueryParam";
import { useToast } from "@/components/costum/Toast/ToastContext";

export interface SelectRemovePostData {
  userId: string | null;
  clerkId: string | undefined;
  username: string | null;
  newRepos: Repository[];
}
const RepositorySettings = () => {
  const [repos, setRepos] = useState<Repository[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<Repository[]>([]);

  const [repoLoading, setRepoLoading] = useState<boolean>(true);
  const { addToast } = useToast();
  // console.log(repoLoading)

  const { user } = useUser();

  const clerkId = user?.id;

  const userId = getLocalStorageItem("userId");
  const username = useQueryParam("username");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setRepoLoading(true);
        const repoFromGhApi = await apiService.getRepoFromGhApi(
          clerkId,
          userId,
          username
        );
        const allReadySelectedRepo = await apiService.getAllSelectedRepo(
          userId,
          username
        );

        // Create a Set of selected repo IDs for quick lookup
        const selectedRepoIds = new Set(
          allReadySelectedRepo?.data.map((repo: any) => repo.repo_id)
        );

        // Mark each repo as selected or not
        const enrichedRepos = repoFromGhApi?.data.map((repo: any) => ({
          ...repo,
          is_selected: selectedRepoIds.has(repo.repo_id),
        }));

        setRepos(enrichedRepos);
        setSelectedRepos(allReadySelectedRepo?.data);
      } catch (error: any) {
        console.log(error);
        throw new Error(error);
      } finally {
        setRepoLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      // console.log(selectedRepos);

      const postData: SelectRemovePostData = {
        userId,
        clerkId,
        username,
        newRepos: selectedRepos,
      };

      const get_data = await apiService.postSaveRemoveRepos(postData);

      if (get_data.status === false) {
        addToast({
          message: get_data.message || "Something went wrong",
          type: "error",
          duration: 4000,
          closeButton: true,
          position: "top-center",
        });
        return;
      }

      addToast({
        message: get_data.message || "Something went wrong",
        type: "success",
        duration: 4000,
        closeButton: true,
        position: "top-center",
      });

      window.location.reload();
      
    } catch (error: any) {
      console.log(error);
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
    <div className="h-screen p-">
      <RepositorySelector
        allRepositories={repos}
        loading={repoLoading}
        initiallySelected={selectedRepos}
        onSelectionChange={setSelectedRepos}
        className="h-[63%] overflow-auto rounded-lg flex flex-col sm:flex-row gap-14 sm:gap-8 px-4 py-2 hide-scrollbar sm:show-scrollbar"
        searchContainerClassName="flex-1 p-[0.20rem] h-full rounded-lg bg-cgray-second "
        selectedContainerClassName="w-full even-shadow h-[22.6rem] p-4 custom-scrollbar overflow-y-auto border rounded-lg bg-white"
        // renderRepoIcon={(repo) => (
        //   <img
        //     src={`https://github.com/${repo.owner.login}.png?size=40`}
        //     className="w-6 h-6 rounded-full mr-3"
        //     alt=""
        //   />
        // )}
        showRepoDetails={true}
      />

      <button disabled={repoLoading} onClick={handleSave} className="blue-button mt-2">
        Save Selection
      </button>

      
    </div>
  );
};

export default RepositorySettings;
