import { NotFoundComponent } from "@/components/costum/Missing/NotFoundComponent";
import { formatDate } from "@/utils/tools";
import { BiSolidCollection } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";

const AllGroups = ({ groupData }: any) => {
  // console.log(groupData);

  const [searchParams, setSearchParams] = useSearchParams();

  const setParmas = (groupId: any) => {
    searchParams.set("expandedGroups", groupId);
    setSearchParams(searchParams, { replace: true });
  };
  return (
    <div className=" w-full h-full">
      <h1 className="text-[2rem] font-semibold mb-6">All Groups</h1>
      <div className="flex flex-wrap gap-4">
        {groupData?.length === 0 ? (

            <div className="w-full ">

                <NotFoundComponent massege={"You have not added any group yet."}/>
            </div>
        ) : (
          groupData.map((group: any) => {
            return (
              <div className="border border-gray-300 rounded-md bg-vol-50 p-[0.1rem]">
                <div
                  className="group  border-b bg-white border-gray-300 h-[8rem] w-[8rem] flex items-center justify-center rounded-md shadow-xs cursor-pointer 
                 transition-all duration-300"
                  onClick={() => setParmas(group?._id)}
                >
                  <div
                    className="flex flex-col items-center text-cgray-dtext 
                  group-hover:text-vol-950 transition-all duration-300"
                  >
                    <span
                      className="transform transition-all duration-300 
                     group-hover:-translate-y-1 group-hover:scale-110"
                    >
                      <BiSolidCollection className="text-[2.5rem]" />
                    </span>

                    <span
                      className=" group-hover:text-vol-950 
                     transition-all duration-300"
                    >
                      {group?.groupName}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col text-[0.5rem] px-2 py-1">
                  <span className="text-cgray-dtext font-medium">
                    Created at
                  </span>
                  <span className="text-cgray-ntext">
                    {`${group?.createdAt && formatDate(group?.createdAt)}`}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AllGroups;
