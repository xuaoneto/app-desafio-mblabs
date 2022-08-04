import { UseToastOptions } from "@chakra-ui/react";
import { toastDefaultStyle } from "components/home-page/apresentation";

function validateFileSize(size: number) {
  //se for "0 Bytes" retornar false
  if (size === 0) return false;
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));
  const formatSize =
    parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  const sizeFloat = parseFloat(formatSize.split(" ")[0]);
  const sizeType = formatSize.split(" ")[1];
  if (sizeFloat > 2 && sizeType === "MB") return false;
  if (sizeType === "GB") return false;
  if (sizeType === "TB") return false;

  return true;
}

function validateFileType(file: File) {
  const validTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/svg",
    "image/webp",
    "image/svg+xml",
  ];
  if (validTypes.indexOf(file.type) === -1) {
    return false;
  }
  return true;
}

export async function toBase64File(file: File): Promise<string | undefined> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      reject(undefined);
    };
  });
}

export function handleValidateFile(
  file: File,
  toast: (a: UseToastOptions) => void
) {
  // (new TextEncoder().encode('foo')).length
  if (validateFileType(file)) {
    if (validateFileSize(file.size)) {
      return file;
    } else {
      toast({
        title: "Arquivo muito grande!",
        description: "Tamanho máximo, 2 MB",
        status: "error",
        ...toastDefaultStyle,
      });
    }
  } else {
    toast({
      title: "Arquivo inválido!",
      description: "Extensões suportadas: jpg, png, webp, svg, jpeg",
      status: "error",
      ...toastDefaultStyle,
    });
  }
}
