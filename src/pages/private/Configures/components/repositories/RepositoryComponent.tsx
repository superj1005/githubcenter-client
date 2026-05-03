// import { apiService } from "@/api/apiService";
import type { PullRequestWithWorkflowsType } from "@/types/repotypes";
import { useEffect, useState } from "react";
import PrWorkflow from "./PrWorkflow";
import { useQueryParam } from "@/hooks/useQueryParam";
import { apiService } from "@/api/apiService";
import { Skeleton } from "@/components/costum/Skeleton";
import { NotFoundComponent } from "@/components/costum/Missing/NotFoundComponent";
import { BoxTab } from "@/components/costum/BoxTab/BoxTab";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { TbLayoutSidebarRightExpandFilled } from "react-icons/tb";
import Summary from "./AiReviewComponents/Summary";
import CodeReview from "./AiReviewComponents/CodeReview";
import BetterCodeSuggestions from "./AiReviewComponents/BetterCodeSuggestions";
import PrDesciption from "./AiReviewComponents/PrDesciption";
import GeneralFeedback from "./AiReviewComponents/GeneralFeedback";
import TestSuggestions from "./AiReviewComponents/TestSuggestions";

interface RepositoryComponentType {
  repo_name: string;
  username: string | null;
  userId: string | null;
}

interface RepoType {
  owner: {
    login: string | null;
  };
  name: string;
  full_name: string;
}

export type ReposRequestType = RepoType[];
const RepositoryComponent = ({
  repo_name,
  username,
  userId,
}: RepositoryComponentType) => {
  const [prData, setPrData] = useState<PullRequestWithWorkflowsType[]>([]);
  const [prLoading, setPrLoading] = useState<boolean>(true);
  const [showRightUi, setShowRightUi] = useState<boolean>(false);
  const [prReviewLoading, setPrReviewLoading] = useState<boolean>(true);
  const [prReviewData, setPrReviewData] = useState<any>({});
  const [selectedPr, setSelectedPr] = useState<any>(null);
  const groupName = useQueryParam("groupName");

  const [isExpand, setIsExpand] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const reposRequest: ReposRequestType = [
        {
          owner: {
            login: username,
          },
          name: repo_name,
          full_name: `${username}/${repo_name}`,
        },
      ];

      try {
        setPrLoading(true);
        const get_data = await apiService.getPrWorkflowInfo(
          reposRequest,
          userId,
          username
        );
        setPrData(get_data.data?.pullRequests?.[`${username}/${repo_name}`]);
      } catch (error) {
        console.log(error);
      } finally {
        setPrLoading(false);
      }
    };

    // console.log(userId);

    // setPrData([
    //   {
    //     pr: {
    //       number: 33,
    //       title:
    //         "Bump github.com/docker/docker from 26.1.4+incompatible to 28.1.0+incompatible",
    //       state: "open",
    //       created_at: "2025-04-18T01:14:45Z",
    //       updated_at: "2025-04-18T01:14:45Z",
    //       user: {
    //         login: "dependabot[bot]",
    //         html_url: "https://github.com/apps/dependabot",
    //       },
    //       html_url: "https://github.com/janisar007/dotnet-execute/pull/33",
    //     },
    //     workflows: null,
    //   },
    //   {
    //     pr: {
    //       number: 31,
    //       title: "Bump the go-modules group across 1 directory with 57 updates",
    //       state: "open",
    //       created_at: "2025-03-21T01:42:36Z",
    //       updated_at: "2025-04-18T01:18:23Z",
    //       user: {
    //         login: "dependabot[bot]",
    //         html_url: "https://github.com/apps/dependabot",
    //       },
    //       html_url: "https://github.com/janisar007/dotnet-execute/pull/31",
    //     },
    //     workflows: null,
    //   },
    //   {
    //     pr: {
    //       number: 28,
    //       title: "Bump github.com/containerd/containerd from 1.7.20 to 1.7.27",
    //       state: "open",
    //       created_at: "2025-03-18T01:34:47Z",
    //       updated_at: "2025-03-18T01:34:47Z",
    //       user: {
    //         login: "dependabot[bot]",
    //         html_url: "https://github.com/apps/dependabot",
    //       },
    //       html_url: "https://github.com/janisar007/dotnet-execute/pull/28",
    //     },
    //     workflows: null,
    //   },
    //   {
    //     pr: {
    //       number: 26,
    //       title: "Bump the go_modules group with 5 updates",
    //       state: "open",
    //       created_at: "2025-03-13T00:57:59Z",
    //       updated_at: "2025-03-13T00:58:00Z",
    //       user: {
    //         login: "dependabot[bot]",
    //         html_url: "https://github.com/apps/dependabot",
    //       },
    //       html_url: "https://github.com/janisar007/dotnet-execute/pull/26",
    //     },
    //     workflows: null,
    //   },
    //   {
    //     pr: {
    //       number: 8,
    //       title: "Bump github.com/sylabs/squashfs from 0.6.1 to 1.0.4",
    //       state: "open",
    //       created_at: "2025-01-20T01:29:24Z",
    //       updated_at: "2025-01-20T01:29:25Z",
    //       user: {
    //         login: "dependabot[bot]",
    //         html_url: "https://github.com/apps/dependabot",
    //       },
    //       html_url: "https://github.com/janisar007/dotnet-execute/pull/8",
    //     },
    //     workflows: null,
    //   },
    //   {
    //     pr: {
    //       number: 7,
    //       title: "Bump github.com/vifraa/gopom from 0.2.1 to 1.0.0",
    //       state: "open",
    //       created_at: "2025-01-20T01:29:08Z",
    //       updated_at: "2025-01-20T01:29:09Z",
    //       user: {
    //         login: "dependabot[bot]",
    //         html_url: "https://github.com/apps/dependabot",
    //       },
    //       html_url: "https://github.com/janisar007/dotnet-execute/pull/7",
    //     },
    //     workflows: null,
    //   },
    //   {
    //     pr: {
    //       number: 3,
    //       title: "Updates github-config",
    //       state: "open",
    //       created_at: "2024-08-12T09:13:02Z",
    //       updated_at: "2024-08-12T09:13:02Z",
    //       user: {
    //         login: "initializ-bot",
    //         html_url: "https://github.com/initializ-bot",
    //       },
    //       html_url: "https://github.com/janisar007/dotnet-execute/pull/3",
    //     },
    //     workflows: [
    //       {
    //         id: 10349106490,
    //         name: "Lint Workflows",
    //         status: "completed",
    //         conclusion: "failure",
    //         created_at: "2024-08-12T09:13:05Z",
    //         updated_at: "2024-08-12T09:13:22Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10349106490",
    //         jobs: [
    //           {
    //             id: 28642795094,
    //             name: "lintYaml",
    //             status: "completed",
    //             conclusion: "failure",
    //             started_at: "2024-08-12T09:13:12Z",
    //             completed_at: "2024-08-12T09:13:20Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10349106497,
    //         name: "Test Pull Request",
    //         status: "completed",
    //         conclusion: "cancelled",
    //         created_at: "2024-08-12T09:13:05Z",
    //         updated_at: "2024-08-12T09:15:02Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10349106497",
    //         jobs: [
    //           {
    //             id: 28642795783,
    //             name: "Get Builders for Testing",
    //             status: "completed",
    //             conclusion: "success",
    //             started_at: "2024-08-12T09:13:15Z",
    //             completed_at: "2024-08-12T09:13:22Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28642796161,
    //             name: "Upload Workflow Event Payload",
    //             status: "completed",
    //             conclusion: "success",
    //             started_at: "2024-08-12T09:13:15Z",
    //             completed_at: "2024-08-12T09:13:17Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28642808791,
    //             name: "Integration Tests with Builders (paketobuildpacks/builder:buildpackless-base)",
    //             status: "completed",
    //             conclusion: "cancelled",
    //             started_at: "2024-08-12T09:13:30Z",
    //             completed_at: "2024-08-12T09:14:44Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28642809102,
    //             name: "Integration Tests with Builders (paketobuildpacks/builder-jammy-buildpackless-base)",
    //             status: "completed",
    //             conclusion: "cancelled",
    //             started_at: "2024-08-12T09:13:30Z",
    //             completed_at: "2024-08-12T09:14:45Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28642868493,
    //             name: "Integration Tests",
    //             status: "completed",
    //             conclusion: "failure",
    //             started_at: "2024-08-12T09:15:00Z",
    //             completed_at: "2024-08-12T09:15:00Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10349106515,
    //         name: "Lint",
    //         status: "completed",
    //         conclusion: "cancelled",
    //         created_at: "2024-08-12T09:13:05Z",
    //         updated_at: "2024-08-12T09:17:22Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10349106515",
    //         jobs: [
    //           {
    //             id: 28642795014,
    //             name: "lint",
    //             status: "completed",
    //             conclusion: "cancelled",
    //             started_at: "2024-08-12T09:13:14Z",
    //             completed_at: "2024-08-12T09:17:20Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10161007532,
    //         name: "Test Pull Request",
    //         status: "completed",
    //         conclusion: "failure",
    //         created_at: "2024-07-30T10:51:43Z",
    //         updated_at: "2024-07-30T10:53:41Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10161007532",
    //         jobs: [
    //           {
    //             id: 28098562877,
    //             name: "Upload Workflow Event Payload",
    //             status: "completed",
    //             conclusion: "success",
    //             started_at: "2024-07-30T10:51:54Z",
    //             completed_at: "2024-07-30T10:51:58Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28098563263,
    //             name: "Get Builders for Testing",
    //             status: "completed",
    //             conclusion: "success",
    //             started_at: "2024-07-30T10:51:52Z",
    //             completed_at: "2024-07-30T10:51:57Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28098572252,
    //             name: "Integration Tests with Builders (initializbuildpacks/securepacks-initzbuilder)",
    //             status: "completed",
    //             conclusion: "failure",
    //             started_at: "2024-07-30T10:52:06Z",
    //             completed_at: "2024-07-30T10:53:29Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28098634406,
    //             name: "Integration Tests",
    //             status: "completed",
    //             conclusion: "failure",
    //             started_at: "2024-07-30T10:53:39Z",
    //             completed_at: "2024-07-30T10:53:39Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10161007534,
    //         name: "Lint Workflows",
    //         status: "completed",
    //         conclusion: "cancelled",
    //         created_at: "2024-07-30T10:51:43Z",
    //         updated_at: "2024-07-30T10:51:59Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10161007534",
    //         jobs: [
    //           {
    //             id: 28098562166,
    //             name: "lintYaml",
    //             status: "completed",
    //             conclusion: "cancelled",
    //             started_at: "2024-07-30T10:51:53Z",
    //             completed_at: "2024-07-30T10:51:57Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10161007530,
    //         name: "Lint",
    //         status: "completed",
    //         conclusion: "cancelled",
    //         created_at: "2024-07-30T10:51:43Z",
    //         updated_at: "2024-07-30T10:52:07Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10161007530",
    //         jobs: [
    //           {
    //             id: 28098562123,
    //             name: "lint",
    //             status: "completed",
    //             conclusion: "cancelled",
    //             started_at: "2024-07-30T10:51:51Z",
    //             completed_at: "2024-07-30T10:52:05Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10160861944,
    //         name: "Test Pull Request",
    //         status: "completed",
    //         conclusion: "failure",
    //         created_at: "2024-07-30T10:40:14Z",
    //         updated_at: "2024-07-30T10:42:15Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10160861944",
    //         jobs: [
    //           {
    //             id: 28098086410,
    //             name: "Get Builders for Testing",
    //             status: "completed",
    //             conclusion: "success",
    //             started_at: "2024-07-30T10:40:25Z",
    //             completed_at: "2024-07-30T10:40:30Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28098086751,
    //             name: "Upload Workflow Event Payload",
    //             status: "completed",
    //             conclusion: "success",
    //             started_at: "2024-07-30T10:40:24Z",
    //             completed_at: "2024-07-30T10:40:27Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28098097650,
    //             name: "Integration Tests with Builders (initializbuildpacks/securepacks-initzbuilder)",
    //             status: "completed",
    //             conclusion: "failure",
    //             started_at: "2024-07-30T10:40:39Z",
    //             completed_at: "2024-07-30T10:42:03Z",
    //             steps: [],
    //           },
    //           {
    //             id: 28098164539,
    //             name: "Integration Tests",
    //             status: "completed",
    //             conclusion: "failure",
    //             started_at: "2024-07-30T10:42:13Z",
    //             completed_at: "2024-07-30T10:42:13Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10160861850,
    //         name: "Lint",
    //         status: "completed",
    //         conclusion: "cancelled",
    //         created_at: "2024-07-30T10:40:14Z",
    //         updated_at: "2024-07-30T10:42:51Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10160861850",
    //         jobs: [
    //           {
    //             id: 28098085900,
    //             name: "lint",
    //             status: "completed",
    //             conclusion: "cancelled",
    //             started_at: "2024-07-30T10:40:22Z",
    //             completed_at: "2024-07-30T10:42:49Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //       {
    //         id: 10160861847,
    //         name: "Lint Workflows",
    //         status: "completed",
    //         conclusion: "cancelled",
    //         created_at: "2024-07-30T10:40:14Z",
    //         updated_at: "2024-07-30T10:40:33Z",
    //         html_url:
    //           "https://github.com/janisar007/dotnet-execute/actions/runs/10160861847",
    //         jobs: [
    //           {
    //             id: 28098085904,
    //             name: "lintYaml",
    //             status: "completed",
    //             conclusion: "failure",
    //             started_at: "2024-07-30T10:40:21Z",
    //             completed_at: "2024-07-30T10:40:31Z",
    //             steps: [],
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ]);

    fetchData();
  }, [repo_name, username]);

  const tabs = [
    {
      id: "reviewwithcodesuggestions",
      label: "Better Code Suggestions",
      content: (
        <BetterCodeSuggestions
          fileSpecificComments={prReviewData.fileSpecificComments}
        />
      ),
      // disabled: true,
    },

    {
      id: "prdescription",
      label: "PR Description",
      content: (
        <PrDesciption prDescription={prReviewData?.prDescription?.[0]?.body} />
      ),
    },

    {
      id: "summary",
      label: "PR Summary",
      content: <Summary summary={prReviewData.summary} />,
    },
    {
      id: "codereview",
      label: "Code Review",
      content: <CodeReview codeReview={prReviewData.codeReview} />,
    },
    {
      id: "testsuggestions",
      label: "Test Suggestions",
      content: (
        <TestSuggestions testSuggestions={prReviewData.testSuggestions} />
      ),
    },
    // {
    //   id: "generalfeedback",
    //   label: "General Feedback",
    //   content: <GeneralFeedback generalFeedback={prReviewData?.generalFeedback}/>,
    // },
  ];

  // console.log(prReviewData);

  return (
    <div className="flex flex-col w-full ">
      <div className="flex pl-4 mb-3 flex-col">
        {groupName && (
          <span className="text-cgray-ntext text-sm flex">
            <span className="bg-gray-100 px-1 rounded-xs">{groupName}</span>
          </span>
        )}

        <div className="flex">
          <span
            onClick={() =>
              window.open(
                `https://github.com/${username}/${repo_name}`,
                "_blank"
              )
            }
            className="text-2xl md:text-4xl font-bold text-cgray-ntext hover:text-blue-700 cursor-pointer hover:underline"
          >
            {`${repo_name}`}
          </span>
        </div>
      </div>
      <div className="flex w-full overflow-y-auto p-2">
        <div
          className={`w-full lg:w-[45%] ${
            isExpand && "hidden"
          } gap-2 flex flex-col p-2`}
        >
          {prLoading ? (
            [1, 2, 3, 4, 5]?.map((e) => {
              return (
                <div key={e} className="border rounded-lg p-3">
                  <div className="flex w-full justify-between items-center mb-5">
                    <Skeleton variant="text" className="" width="7%" />
                    <Skeleton
                      variant="circle"
                      className=""
                      width={"9%"}
                      height={20}
                    />
                  </div>
                  <div className="mb-7">
                    <Skeleton variant="text" className="mb-2" width="70%" />

                    <div className="flex items-center gap-2">
                      <Skeleton
                        variant="circle"
                        className=""
                        width={30}
                        height={30}
                      />

                      <Skeleton variant="text" className="" width="20%" />
                    </div>
                  </div>
                  <Skeleton variant="text" width="17%" className="mb-5" />
                </div>
              );
            })
          ) : prData.length === 0 ? (
            <NotFoundComponent
              massege={
                "There might not be any Pull Request in this repository."
              }
            />
          ) : (
            prData.map(
              (prInfo: PullRequestWithWorkflowsType, index: number) => {
                return (
                  <PrWorkflow
                    key={index}
                    pr={prInfo.pr}
                    workflows={prInfo.workflows}
                    repo_name={repo_name}
                    username={username}
                    setPrReviewData={setPrReviewData}
                    setPrReviewLoading={setPrReviewLoading}
                    setShowRightUi={setShowRightUi}
                    setSelectedPr={setSelectedPr}
                    selectedPr={selectedPr}
                  />
                );
              }
            )
          )}
        </div>

        { showRightUi &&
          <div className={`${!isExpand ? "w-[55%]" : "w-full"}`}>
            <div className="p-[0.18rem] max-w-4xl mx-auto bg-vol-50 rounded-lg mt-2">
              <div className="w-full flex gap-3  items-center mb-8 mt-4 ml-2 ">
                <div className="">
                  {!isExpand ? (
                    <TbLayoutSidebarRightExpandFilled
                      className="text-xl cursor-pointer hover:text-vol-800"
                      onClick={() => setIsExpand(!isExpand)}
                    />
                  ) : (
                    <TbLayoutSidebarLeftExpandFilled
                      className="text-xl cursor-pointer hover:text-vol-800"
                      onClick={() => setIsExpand(!isExpand)}
                    />
                  )}
                </div>

                {selectedPr && <div className="text-[1.1rem]  font-bold  mr-2">
                  {selectedPr?.title}{" "}
                </div>}
              </div>

              {prReviewLoading ? (
                <div className="w-full bg-white border py-4 px-5 rounded-lg flex flex-col gap-8">
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="" height={45} width="20%" />
                    <Skeleton className="" height={45} width="30%" />
                    <Skeleton className="" height={45} width="40%" />
                    <Skeleton className="" height={45} width="30%" />
                    <Skeleton className="" height={45} width="35%" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="" height={300} width="100%" />
                  </div>
                </div>
              ) : Object.keys(prReviewData).length === 0 ? (
                <NotFoundComponent />
              ) : (
                <BoxTab
                  items={tabs}
                  layout="auto"
                  boxClassName="hover:shadow-md font-medium cursor-pointer"
                  activeBoxClassName="shadow-md bg-vol-100 text-black"
                  containerClassName="border p-4 rounded-lg bg-white"
                  contentClassName="mt-8 bg-vol-50"
                />
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default RepositoryComponent;
