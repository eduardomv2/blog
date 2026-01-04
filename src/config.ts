export const SITE = {
  website: "https://www.eduardomv.xyz/", 
  author: "Eduardo M.V.",
  profile: "" /* actualizar cuando ya tenga portfolio o si lo hago en about redirigir a ese: */,
  desc: "blog sobre tecnología",
  title: "eduardomv.xyz",
  ogImage: "minho.jpg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Proponer Cambios",
    url: "https://github.com/eduardomv2/blog/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "es", // html lang code. Set this empty and default will be "en"
  timezone: "America/Monterrey",
} as const;
