type FileExtension = "pdf" | "xls" | "doc" | "txt" | "png" | "jpg" | "jpeg" | "zip";

const extColor: Record<FileExtension, string> = {
  pdf: "purple",
  xls: "green",
  doc: "blue",
  txt: "blue",
  png: "orange",
  jpg: "orange",
  jpeg: "orange",
  zip: "red",
};

export type Extension = keyof typeof extColor;
export type Color = typeof extColor[Extension];

export const getColorByExtension = (ext: string | undefined): Color => {
  // @ts-ignore
    return extColor[ext];
};