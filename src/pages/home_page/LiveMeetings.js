import React, { useCallback, useEffect } from "react";
import LiveMeetingsTable from "../../components/tables/LiveMeetingsTable";
import { useDispatch, useSelector } from "react-redux";
import EmptyBoxMessager from "../../components/EmptyBoxMessager";
import LoaderIndicator from "../../components/loaders/LoaderIndicator";
import { fetchLiveMeetings } from "../../context/reservation/liveMeetingSlice";

const LiveMeetings = () => {
  const dispatch = useDispatch();
  const liveMeetings = useSelector((state) => state.liveMeeting.liveMeetings);
  const isLoading = useSelector((state) => state.liveMeeting.isLoading);

  const fetchLiveMeetingsFromServer = useCallback(() => {
    dispatch(fetchLiveMeetings());
  }, [dispatch]);

  useEffect(() => {
    fetchLiveMeetingsFromServer();
  }, [fetchLiveMeetingsFromServer]);

  return (
    <div id="live-meetings" className="p-2">
      <span className="block w-max uppercase mb-4 tracking-wide font-[Roboto] bg-gray-100 shadow-sm p-2">
        Continuing Meetings
      </span>
      {liveMeetings.length === 0 && !isLoading ? (
        <EmptyBoxMessager displayText={"No live meeting to display!"} />
      ) : isLoading ? (
        <LoaderIndicator />
      ) : (
        <LiveMeetingsTable liveMeetings={liveMeetings} />
      )}
    </div>
  );
};

export default LiveMeetings;
