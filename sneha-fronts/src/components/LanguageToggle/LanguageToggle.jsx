import { useLanguage } from "../../contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  // return (
  //   <div className="fixed top-4 right-4 z-50">
  //     <button
  //       onClick={toggleLanguage}
  //       className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg transition-colors duration-200"
  //     >
  //       {language === "en" ? "मराठी" : "English"}
  //     </button>
  //   </div>
  // );
};
