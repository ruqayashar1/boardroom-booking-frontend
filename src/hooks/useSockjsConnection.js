import { over } from "stompjs";
import SockJS from "sockjs-client";
import { WS_BASE_URL } from "../constants";
import { useEffect } from "react";

const useSockjsConnection = (
  tag,
  isAuthenticated,
  isAuthenticatedUserAdmin,
  onAdminRoomNotification,
  onUserPrivateNotification
) => {
  useEffect(() => {
    let stompClient = null;

    const onConnected = () => {
      console.log("nwenfewfu");

      if (isAuthenticatedUserAdmin) {
        // Subscribe to the admin room
        stompClient.subscribe("/admin/room", (message) => {
          // When a message is received, call the onPublishMessage function with the message
          onAdminRoomNotification(JSON.parse(message.body)); // Assuming the message is in JSON format
        });
      }
      stompClient.subscribe(`/user/${tag}/private`, (message) => {
        onUserPrivateNotification(JSON.parse(message.body));
      });
    };

    const onError = (error) => {
      console.error("Error connecting to WebSocket:", error);
    };

    if (tag && isAuthenticated) {
      const sock = new SockJS(WS_BASE_URL);
      stompClient = over(sock);
      // Connect to the STOMP server
      stompClient.connect({}, onConnected, onError);
    }

    // Clean up the subscription on component unmount
    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [tag]); // Effect depends on role and onPublishMessage
};

export default useSockjsConnection;
