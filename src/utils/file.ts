import fs from "fs";

/**
 * Delete a file from the file system.
 * @param filename - name of the file to delete
 * @returns - void
 */
export const deleteFile = async (filename: string) => {
  try {
    // verify if file exists
    await fs.promises.stat(filename);
  } catch {
    return;
  }
  // remove the file
  await fs.promises.unlink(filename);
};
