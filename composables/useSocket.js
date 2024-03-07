import { ref, onUnmounted, onMounted } from "vue";
import { io } from "socket.io-client";

export default function useSocket(server) {
  const socket = ref(
    io(server, {
      reconnection: true,
      reconnectionAttempts: Infinity,
    })
  );

  // Function to listen to events
  const on = (event, callback) => {
    socket.value.on(event, callback);
  };

  // Function to emit events
  const emit = (event, args) => {
    socket.value.emit(event, args);
  };

  // Function to disconnect the socket
  const disconnect = () => {
    if (socket.value) {
      socket.value.disconnect();
    }
  };

  // Disconnect the socket when the page is unloaded
  onMounted(() => {
    window.addEventListener("beforeunload", disconnect);
  });

  // Cleanup when component unmounts
  onUnmounted(() => {
    disconnect();
    window.removeEventListener("beforeunload", disconnect);
  });

  return { socket, on, emit };
}
