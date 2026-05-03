import { useEffect, useState } from "react";
import CardGrid from "./components/SearchCard";
import { apiService } from "@/api/apiService";
import { getLocalStorageItem } from "@/utils/storage";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Dashboard = () => {
  const [ghData, setGhData] = useState<any>();
  const [ghLoading, setGhLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const {user} = useUser();

  const username = user?.id;

  const userId = getLocalStorageItem("userId");

  // console.log("userId", userId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gh_data = await apiService.getAllGhInfo(userId);
        // console.log(gh_data);
        setGhData(gh_data?.data);
      } catch (error) {
        console.log(error);
      } finally {
        setGhLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (card:any) => {

    navigate(`/${username}/configures?username=${card?.username}&userId=${userId}`)
    

  }

  return (
    <div className="flex flex-col p-4 bg-white h-[calc(100vh-7rem)]">
      <div className="p-4border-2">

        
        {
          <CardGrid
            cards={ghData}
            loading={ghLoading}
            onBookmark={(cardId) => console.log("Bookmark", cardId)}
            onShare={(cardId) => console.log("Share", cardId)}
            onCardClick={handleCardClick}
            className="max-w-[84rem] mx-auto bg-white"
            cardClassName="cursor-pointer border border-vol-200"
            searchPlaceholder="Search accounts..."
            emptyMessage="No matching accoiunt found"
          />
        }
      </div>
    </div>
  );
};

export default Dashboard;
