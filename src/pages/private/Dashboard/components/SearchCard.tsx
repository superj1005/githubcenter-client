import React, { useState, useMemo, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { IoLogoGithub } from "react-icons/io";
import { MdOutlineDateRange } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAnalytics } from "react-icons/io";
import Dialog from "@/components/costum/Dialog";
import AddGithubDialogBox from "./AddGithubDialogBox";
import { Skeleton } from "@/components/costum/Skeleton";
import { formatDate } from "@/utils/tools";
import VideoDialogBox from "./VideoDialogBox";
import Tooltip from "@/components/costum/Tooltip/Tooltip";

interface Card {
  userId: string;
  clerkId: string;
  username: string;
  avatarUrl?: string;
  accUrl: string;
  createdAt: any;
}

interface CardGridProps {
  cards: Card[];
  loading?: boolean;
  className?: string;
  cardClassName?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  maxColumns?: number;
  showSearch?: boolean;
  showActions?: boolean;
  onCardClick?: (card: Card) => void;
  onFavorite?: (cardId: string) => void;
  onBookmark?: (cardId: string) => void;
  onShare?: (cardId: string) => void;
}

const CardGrid: React.FC<CardGridProps> = ({
  cards,
  loading = false,
  className = "",
  cardClassName = "",
  searchPlaceholder = "Search cards...",
  emptyMessage = "No cards found",
  maxColumns = 2,
  showSearch = true,
  //   showActions = true,
  onCardClick,
  //   onFavorite,
  //   onBookmark,
  //   onShare,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<any>(null);

  const [isVidOpen, setIsVidOpen] = useState(false);
  const inputVidRef = useRef<any>(null);

  const [searchTerm, setSearchTerm] = useState("");
  //   const [favoritesOnly, setFavoritesOnly] = useState(false);
  //   const [selectedTag, setSelectedTag] = useState<string | null>(null);
  function convertGithubUrl(url: any) {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "github.com") {
        return `github${parsed.pathname}`;
      }
      throw new Error("Not a valid GitHub URL");
    } catch (error: any) {
      console.error("Invalid URL:", error.message);
      return null;
    }
  }

  // Get all unique tags from cards
  //   const allTags = useMemo(() => {
  //     const tags = new Set<string>();
  //     cards.forEach(card => {
  //       card.tags?.forEach(tag => tags.add(tag));
  //     });
  //     return Array.from(tags);
  //   }, [cards]);

  // Filter cards based on search term, favorites, and tags
  const filteredCards = useMemo(() => {
    return cards?.filter((card) => {
      const matchesSearch = card.username
        ?.toLowerCase()
        ?.includes(searchTerm?.toLowerCase());
      // || card.description.toLowerCase().includes(searchTerm.toLowerCase());
      //   const matchesFavorites = !favoritesOnly || card.isFavorite;
      //   const matchesTag = !selectedTag || card.tags?.includes(selectedTag);
      return matchesSearch;
    });
  }, [cards, searchTerm, loading]);

  // console.log(filteredCards);

  return (
    <div className={`flex flex-col ${className}`}>
      {/* Search and Filter Controls */}
      {showSearch && (
        <div className=" mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-cgray-border bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            {/* <button
              //   onClick={() => setFavoritesOnly(!favoritesOnly)}
              onClick={() => setIsOpen(true)}
              className={`blue-button`}
            >
              Add Github
            </button> */}
            {/* <button
              onClick={() => setFavoritesOnly(!favoritesOnly)}
              className={`px-4 py-2 rounded-lg ${favoritesOnly ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Favorites
            </button> */}

            {/* {allTags.length > 0 && (
              <select
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            )} */}
          </div>
        </div>
      )}

      <div className="flex w-full gap-6">
        {/* <div className="flex border-2 border-green-500 w-[30%]">something</div> */}

        <div className=" w-[100%]">
          {/* Cards Grid */}

          <div className="text-2xl text-cgray-dtext font-semibold mb-6 mt-1 ">
            You Github Accounts
          </div>

          {!loading && filteredCards.length > 0 ? (
            <div
              className={`grid gap-6 ${
                maxColumns === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4 "
              }`}
            >
              <div
                className={`flex items-center justify-center border-[0.09rem] hover:border-gray-500 rounded-md overflow-hidden cursor-pointer border-dashed border-vol-500 bg-vol-50 font-medium text-cgray-ntext hover:text-cgray-dtext h-[9.5rem] sm:h-auto`}
                onClick={() => setIsOpen(true)}
              >
                + Add Github
              </div>
              {filteredCards.map((card) => (
                <div
                  key={card.username}
                  className={` border-[0.09rem] border-gray-100 hover:border-gray-300 rounded-md overflow-hidden shadow-sm transition-shadow ${cardClassName}`}
                  onClick={() => onCardClick?.(card)}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2 mb-2  w-full">
                            <div className="h-8 w-8 bg-gray-100 overflow-hidden rounded-full">
                              <img
                                src={card.avatarUrl}
                                alt={card.username}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-sm text-cgray-dtext font-semibold">
                              {card.username}
                            </div>
                          </div>

                          <div className="flex items-center gap-5">
                            <Tooltip
                              delay={50}
                              offset={12}
                              content="Comming Soon"
                              position="top"
                              tooltipClassName="bg-vol-950 text-white"
                              arrowClassName="bg-vol-950"
                            >
                              <div className="text-xl text-cgray-ntext">
                                <IoIosAnalytics />
                              </div>
                            </Tooltip>
                            <div className="text-cgray-dtext">
                              <BsThreeDots />
                            </div>
                          </div>
                        </div>

                        <div className="flex">
                          <span
                            onClick={() => window.open(card?.accUrl, "_blank")}
                            className="cursor-pointer flex items-center gap-1 bg-gray-200 px-[0.3rem] py-[0.18rem] rounded-lg mb-6"
                          >
                            <span>
                              <IoLogoGithub />
                            </span>

                            <div className="text-xs">
                              {convertGithubUrl(card?.accUrl)}
                            </div>
                          </span>
                        </div>

                        <div className="text-sm capitalize text-cgray-ntext flex items-center gap-1">
                          <MdOutlineDateRange />
                          <span>
                            {card?.createdAt && formatDate(card?.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* {showActions && (
                          <div className="flex gap-2">
                          <button
                              onClick={(e) => {
                              e.stopPropagation();
                              onFavorite?.(card.id);
                              }}
                              className={`p-1 rounded-full ${card.isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
                          >
                              <FiHeart />
                          </button>
                          <button
                              onClick={(e) => {
                              e.stopPropagation();
                              onBookmark?.(card.id);
                              }}
                              className={`p-1 rounded-full ${card.isBookmarked ? 'text-blue-500' : 'text-gray-400 hover:text-blue-500'}`}
                          >
                              <FiBookmark />
                          </button>
                          <button
                              onClick={(e) => {
                              e.stopPropagation();
                              onShare?.(card.id);
                              }}
                              className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                          >
                              <FiShare2 />
                          </button>
                          </div>
                      )} */}
                    </div>
                    {/* <p className="text-gray-600 mb-3">{card.description}</p> */}
                    {/* {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                          {card.tags.map(tag => (
                          <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                              {tag}
                          </span>
                          ))}
                      </div>
                      )} */}
                  </div>
                </div>
              ))}
            </div>
          ) : loading ? (
            <div
              className={`grid gap-6 ${
                maxColumns === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4 "
              }`}
            >
              {[1, 2, 3, 4, 5]?.map((e) => {
                return (
                  <div key={e} className="border rounded-lg p-6">
                    <div className="mb-5">
                      <Skeleton variant="text" className="mb-2" width="40%" />
                      <Skeleton variant="text" className="" width="45%" />
                    </div>
                    <Skeleton variant="text" width="60%" className="" />
                  </div>
                );
              })}
            </div>
          ) : !loading && filteredCards.length <= 0 ? (
            <div
              className={`grid gap-6 ${
                maxColumns === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-4 "
              }`}
            >
              <div
                className={`flex items-center justify-center border-[0.09rem] hover:border-gray-500 rounded-md overflow-hidden cursor-pointer border-dashed border-vol-500 bg-vol-50 font-medium text-cgray-ntext hover:text-cgray-dtext h-[9.5rem] sm:h-[8.5rem]`}
                onClick={() => setIsOpen(true)}
              >
                + Add Github
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              {emptyMessage}
            </div>
          )}
        </div>
      </div>

      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={<span>Add Github Account</span>}
        initialFocusRef={inputRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        // headerClassName="bg-gray-50"
        bodyClassName="bg-white"
        // footerClassName="bg-gray-50"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={
          <div className="flex justify-end gap-2">
            {/* <button className="white-button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="blue-button" onClick={() => setIsOpen(false)}>
              Confirm
            </button> */}
          </div>
        }
      >
        <AddGithubDialogBox setIsVidOpen={setIsVidOpen} />
      </Dialog>

      <Dialog
        isOpen={isVidOpen}
        onClose={() => setIsVidOpen(false)}
        title={<span>Pat create video</span>}
        initialFocusRef={inputVidRef}
        overlayBlur="blur(8px)"
        overlayDarkness="rgba(0, 0, 0, 0.7)"
        overlayClassName="transition-opacity duration-300"
        contentClassName="w-full max-w-xl"
        headerClassName="hidden"
        bodyClassName="bg-white"
        footerClassName="hidden"
        closeButtonClassName="text-gray-500 hover:text-gray-700"
        footerContent={
          <div className="flex justify-end gap-2">
            {/* <button className="white-button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="blue-button" onClick={() => setIsOpen(false)}>
              Confirm
            </button> */}
          </div>
        }
      >
        <VideoDialogBox />
      </Dialog>
    </div>
  );
};

export default CardGrid;
