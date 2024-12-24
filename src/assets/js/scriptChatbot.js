
document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggler = document.querySelector(".chatbot-toggler");
  const closeBtn = document.querySelector(".close-btn");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  var eR = false;
  let userMessage = null; // Variable to store user's message
  const API_KEY = "PASTE-YOUR-API-KEY"; // Paste your API key here
  const inputInitHeight = chatInput ? chatInput.scrollHeight : 0;

  const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"
      ? `<div></div>`
      : `<span><img src="/images/logo.png" alt="icon" width="30" height="30"></span><div></div>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("div").textContent = message;
    return chatLi;
  };

  const generateResponse = (chatElement, userMessage) => {
    const API_URL = `http://localhost:8080/api/v1/chat-ai`;
    const messageElement = chatElement.querySelector("div");

    // Tạo URL với tham số message
    const urlWithParams = `${API_URL}?message=${encodeURIComponent(userMessage)}`;

    // Định nghĩa các tùy chọn yêu cầu
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    };

    // Gửi yêu cầu GET đến API và xử lý phản hồi theo kiểu stream
    fetch(urlWithParams, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        if (!response.body) {
          throw new Error("No response body");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let result = '';

        const processStream = ({ done, value }) => {
          if (done) {
            console.log("Finished streaming.");
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          result += chunk;

          const htmlContent = marked.parse(result);
          messageElement.innerHTML = htmlContent;
          chatbox.scrollTo(0, chatbox.scrollHeight);
          return reader.read().then(processStream);
        };

        return reader.read().then(processStream);
      })
      .catch(error => {
        console.error("Error occurred:", error);
        messageElement.classList.add("error");

        if (error.message.includes("Failed to fetch")) {
          messageElement.textContent = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.";
        } else {
          messageElement.textContent = "Oops! Có lỗi xảy ra. Vui lòng thử lại.";
        }
      })
      .finally(() => {
        chatbox.scrollTo(0, chatbox.scrollHeight);
      });
  };

  const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    if (eR === false) {
      setTimeout(() => {
        const incomingChatLi = createChatLi("Đang soạn...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi, userMessage);
      }, 600);
    }
  };

  if (chatInput) {
    chatInput.addEventListener("input", () => {
      chatInput.style.height = `${inputInitHeight}px`;
      chatInput.style.height = `${chatInput.scrollHeight}px`;
    });

    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
      }
    });
  }

  sendChatBtn?.addEventListener("click", handleChat);
  closeBtn?.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
  chatbotToggler?.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
});
