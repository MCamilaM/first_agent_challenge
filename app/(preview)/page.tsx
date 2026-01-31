"use client";

import { ReactNode, useRef, useState } from "react";
import { useActions } from "ai/rsc";
import { Message } from "@/components/message";
import { useScrollToBottom } from "@/components/use-scroll-to-bottom";
import { motion } from "framer-motion";
import { ChevroletLogo } from "@/components/icons";

export default function Home() {
  const { sendMessage } = useActions();

  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Array<ReactNode>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();


  return (
    <div className="flex flex-row justify-center pb-20 h-dvh bg-[#181D27]">
      <div className="flex flex-col justify-between gap-4">
        <div
          ref={messagesContainerRef}
          className="flex flex-col gap-3 h-full w-dvw items-center overflow-y-scroll"
        >
          {messages.length === 0 && (
            <motion.div
              className="h-[400px] px-4 w-full md:w-[500px] md:px-0 pt-20"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="gold-border rounded-xl p-8 flex flex-col gap-5 items-center text-center gold-glow bg-[#1E2636]">
                <ChevroletLogo />
                <h1 className="text-xl font-bold text-[#D4A843] tracking-widest">
                  CHEVROLET
                </h1>
                <p className="text-sm text-zinc-300">
                  Asistente Virtual de Ventas
                </p>
                <p className="text-xs text-zinc-500 max-w-sm leading-relaxed">
                  Bienvenido. Estoy aquí para ayudarte a encontrar el vehículo
                  Chevrolet ideal para ti. Escríbeme lo que necesites.
                </p>
              </div>
            </motion.div>
          )}
          {messages.map((message) => message)}
          <div ref={messagesEndRef} />
        </div>

        <form
          className="flex flex-col gap-2 relative items-center"
          onSubmit={async (event) => {
            event.preventDefault();

            setMessages((messages) => [
              ...messages,
              <Message key={messages.length} role="user" content={input} />,
            ]);
            setInput("");

            const response: ReactNode = await sendMessage(input);
            setMessages((messages) => [...messages, response]);
          }}
        >
          <input
            ref={inputRef}
            className="bg-[#1E2636] border border-[#2A3347] rounded-lg px-4 py-2.5 w-full outline-none text-zinc-200 placeholder:text-zinc-500 md:max-w-[500px] max-w-[calc(100dvw-32px)] focus:border-[#D4A843] focus:ring-1 focus:ring-[#D4A843]/30 transition-colors"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
        </form>
      </div>
    </div>
  );
}
