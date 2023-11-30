"use client";
import AnswersContextProvider from "@/store/Learning-set-Context";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnswersContextProvider>{children}</AnswersContextProvider>;
}
